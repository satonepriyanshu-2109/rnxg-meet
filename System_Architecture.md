# System Architecture

## 1. Current Architecture

The MVP is a responsive web application.

```text
                    ┌──────────────────────┐
                    │      User Browser    │
                    │ Desktop / Tablet /   │
                    │ Android / iPhone Web │
                    └──────────┬───────────┘
                               │
                               │ HTTPS / API
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │ UI + Routing + State │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │   FastAPI Backend    │
                    │ Auth + Business Logic│
                    │ Validation + QR      │
                    └──────────┬───────────┘
                               │
                               │ SQL
                               ▼
                    ┌──────────────────────┐
                    │     PostgreSQL       │
                    │ Persistent Data      │
                    └──────────────────────┘
```

## 2. Optional Real-Time Layer

Where useful:

```text
React Frontend
      │
      ├── REST ──────────► FastAPI
      │
      └── WebSocket ────► FastAPI
                              │
                              ▼
                         PostgreSQL
```

WebSockets may be used for:
- live attendance count
- meeting status
- dashboard updates
- notification updates

They are not required for every feature.

## 3. Core Responsibilities

### React
Responsible for:
- UI
- routing
- forms
- responsive layout
- camera/QR interface
- browser geolocation when implemented
- displaying server responses

React must not be the final authority for:
- permissions
- attendance validity
- meeting timing
- absence calculation
- security decisions

### FastAPI
Responsible for:
- authentication
- authorization
- validation
- meeting lifecycle
- QR session generation/validation
- attendance logic
- absence calculation
- business rules
- database access
- API responses

### PostgreSQL
Responsible for persistent storage:
- users
- meetings
- attendance
- QR sessions
- leave requests
- notifications
- audit logs
- future analytics/reporting data

## 4. Meeting Lifecycle

```text
DRAFT
  │
  ▼
PENDING_APPROVAL
  │
  ├──► REJECTED
  │
  ▼
APPROVED
  │
  ▼
UPCOMING
  │
  ▼
ATTENDANCE_OPEN
  │
  ▼
ONGOING
  │
  ▼
CLOSED
  │
  ▼
COMPLETED
```

Possible cancellation path:
`APPROVED/UPCOMING/ONGOING → CANCELLED`

## 5. Attendance Flow

```text
Member Login
     │
     ▼
Scan QR
     │
     ▼
Validate Token
     │
     ▼
Validate Meeting
     │
     ▼
Validate Time
     │
     ▼
Validate User Eligibility
     │
     ▼
Check Location (V2)
     │
     ▼
Check Duplicate
     │
     ▼
Create Attendance
     │
     ▼
PRESENT
```

After the attendance window:

```text
Expected Members
       │
       ├── Present
       ├── Excused
       └── Neither
              │
              ▼
            Absent
```

## 6. Future Flutter Architecture

The future mobile application should reuse the same backend:

```text
React Web ───────┐
                 │
Flutter Android ─┼──► FastAPI ───► PostgreSQL
                 │
Flutter iOS ─────┘
```

This is intentionally outside the MVP.

## 7. Deployment Direction

Development can initially run locally.

Future production deployment may use:
- HTTPS
- managed PostgreSQL
- containerized backend
- frontend hosting
- environment-based configuration
- database backups

The exact hosting provider is not yet fixed.
