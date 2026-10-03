# RNXG Attendance & Meeting Management System

A digital attendance and meeting management system for RNXG.

## Current Goal

This repository is currently building a **responsive web MVP/prototype**.

The immediate goal is to replace the club's notebook-based meeting attendance workflow with a centralized, reliable, and testable system.

> Flutter/Dart mobile development is future scope. It will begin only after the web MVP is successfully tested and the core requirements are validated.

## Problem

RNXG currently records meeting attendance manually using a notebook. This makes attendance:
- Time-consuming
- Difficult to verify
- Difficult to search
- Difficult to analyze
- Vulnerable to manual mistakes

## Proposed Workflow

```text
Coordinator
    │
    ▼
Create Meeting
    │
    ▼
Admin Approval
    │
    ▼
Meeting Approved
    │
    ▼
QR Attendance Opens
    │
    ▼
Members Scan
    │
    ▼
Server Validation
    │
    ▼
Attendance Recorded
    │
    ▼
Attendance Window Closes
    │
    ▼
Absent Members Calculated
```

## Main MVP Features

- Authentication
- Admin / Coordinator / Member roles
- Member management
- Meeting creation
- Meeting approval
- Official/unofficial meetings
- FY/SY/TY/ALL targeting
- QR attendance
- 15-minute early / 15-minute late default attendance window
- Duplicate attendance prevention
- Automatic absence calculation
- Attendance history
- Consecutive absence detection
- Basic admin dashboard
- Responsive web interface

## Planned Future Features

### V2
- Geofencing/GPS
- Leave/excused absence
- Notifications
- MoM
- Analytics
- Audit logs
- Rotating QR
- CSV/Excel/PDF reports

### V3
- Flutter Android app
- Flutter iOS app
- Push notifications
- Advanced analytics
- PWA/offline improvements
- Production deployment

## Technology

### Frontend
React

### Backend
FastAPI / Python

### Database
PostgreSQL

### Future Mobile
Flutter / Dart

## Repository Structure

```text
rnxg-attendance/
├── frontend/
├── backend/
├── database/
├── tests/
├── docs/
├── README.md
└── AGENTS.md
```

## Documentation

Important project documentation:
- `AGENTS.md` — development instructions
- `Project Overview.md` — project purpose and scope
- `Requirements.md` — system requirements
- `Business Rules.md` — attendance and club rules
- `User Roles Permissions.md` — permission model
- `System Architecture.md` — architecture
- `Database Design.md` — database model
- `API Specification.md` — API contract
- `UI UX Specification.md` — interface guidelines
- `Decisions.md` — important architectural/product decisions
- `Security Rules.md` — security requirements

## Development Principle

Build the smallest correct system first.

Do not add future complexity before the MVP workflow works:

**Create → Approve → Open QR → Scan → Validate → Record → Close → Calculate Absence → View History**

## Status

**Phase: MVP / Prototype initialization**

## Authentication slice

The first runnable slice provides email/password member registration, sign-in, secure sessions, and one-time RNXG Attendance ID onboarding. See `backend/` and `frontend/`.

### Run locally

1. Start PostgreSQL with `docker compose up -d db` from this folder. If `DATABASE_URL` is unset, the backend uses SQLite for a quick prototype.
2. In `backend`, create a virtual environment, install `pip install -r requirements.txt`, then run `uvicorn app.main:app --reload` (API at `http://localhost:8000`).
3. In `frontend`, run `npm install` and `npm run dev` (web app at `http://localhost:5173`).
4. For PostgreSQL, set environment variables from `backend/.env.example`. Use a strong random `AUTH_SECRET` and `COOKIE_SECURE=true` behind HTTPS. Never use example credentials in production.

New accounts are always assigned the `MEMBER` role by the server. Email and Attendance ID uniqueness are database-enforced. Passwords use Argon2 hashes and browser sessions use signed HttpOnly cookies.
