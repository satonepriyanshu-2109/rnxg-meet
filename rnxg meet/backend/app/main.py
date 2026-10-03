import os
import re
from datetime import datetime, timedelta, timezone

import jwt
from fastapi import Depends, FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from jwt import InvalidTokenError
from pwdlib import PasswordHash
from pydantic import BaseModel, ConfigDict, EmailStr, Field
from sqlalchemy import Boolean, DateTime, String, create_engine, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./rnxg_meet.db")
AUTH_SECRET = os.getenv("AUTH_SECRET", "local-development-only-change-before-deploying")
COOKIE_SECURE = os.getenv("COOKIE_SECURE", "false").lower() == "true"
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {})
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)
password_hash = PasswordHash.recommended()\ndummy_password_hash = password_hash.hash("not-a-real-password")
bearer_scheme = HTTPBearer(auto_error=False)

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    attendance_id: Mapped[str | None] = mapped_column(String(24), unique=True, index=True, nullable=True)
    role: Mapped[str] = mapped_column(String(20), default="MEMBER")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

Base.metadata.create_all(engine)
app = FastAPI(title="RNXG Meet API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=[FRONTEND_ORIGIN], allow_credentials=True, allow_methods=["GET", "POST", "OPTIONS"], allow_headers=["Content-Type", "Authorization"])

def get_db():
    with SessionLocal() as db:
        yield db

class RegisterInput(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=10, max_length=128)

class LoginInput(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)

class AttendanceIdInput(BaseModel):
    attendance_id: str = Field(min_length=5, max_length=24)

class UserOutput(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    email: EmailStr
    attendance_id: str | None
    role: str

def set_session(user: User, response: Response):
    token = jwt.encode({"sub": str(user.id), "exp": datetime.now(timezone.utc) + timedelta(hours=12)}, AUTH_SECRET, algorithm="HS256")
    response.set_cookie("rnxg_session", token, httponly=True, secure=COOKIE_SECURE, samesite="lax", max_age=43200, path="/")

def authenticated_user(request: Request, db: Session = Depends(get_db), bearer=Depends(bearer_scheme)) -> User:
    token = request.cookies.get("rnxg_session") or (bearer.credentials if bearer else None)
    if not token:
        raise HTTPException(status_code=401, detail="Please sign in to continue.")
    try:
        user_id = int(jwt.decode(token, AUTH_SECRET, algorithms=["HS256"])["sub"])
    except (InvalidTokenError, KeyError, ValueError):
        raise HTTPException(status_code=401, detail="Your session has expired. Please sign in again.")
    user = db.get(User, user_id)
    if not user or not user.is_active:
        raise HTTPException(status_code=401, detail="This account is unavailable.")
    return user

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.post("/api/auth/register", response_model=UserOutput, status_code=201)
def register(payload: RegisterInput, response: Response, db: Session = Depends(get_db)):
    email = str(payload.email).strip().lower()
    user = User(name=payload.name.strip(), email=email, password_hash=password_hash.hash(payload.password), role="MEMBER")
    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="An account with this email already exists.")
    db.refresh(user)
    set_session(user, response)
    return user

@app.post("/api/auth/login", response_model=UserOutput)
def login(payload: LoginInput, response: Response, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.email == str(payload.email).strip().lower()))
    # Perform a hash check for unknown addresses as well to reduce account-enumeration timing differences.
    candidate = user.password_hash if user else dummy_password_hash
    valid = password_hash.verify(payload.password, candidate)
    if not user or not valid or not user.is_active:
        raise HTTPException(status_code=401, detail="Email or password is incorrect.")
    set_session(user, response)
    return user

@app.post("/api/auth/logout", status_code=204)
def logout(response: Response):
    response.delete_cookie("rnxg_session", path="/", httponly=True, secure=COOKIE_SECURE, samesite="lax")

@app.get("/api/auth/me", response_model=UserOutput)
def me(user: User = Depends(authenticated_user)):
    return user

@app.post("/api/auth/attendance-id", response_model=UserOutput)
def create_attendance_id(payload: AttendanceIdInput, user: User = Depends(authenticated_user), db: Session = Depends(get_db)):
    if user.attendance_id:
        raise HTTPException(status_code=409, detail="Your RNXG Attendance ID has already been set.")
    attendance_id = payload.attendance_id.strip().upper()
    if not re.fullmatch(r"RNXG-[A-Z0-9]{4,16}", attendance_id):
        raise HTTPException(status_code=422, detail="Use RNXG- followed by 4–16 letters or numbers.")
    user.attendance_id = attendance_id
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="That RNXG Attendance ID is already in use. Try another.")
    db.refresh(user)
    return user

