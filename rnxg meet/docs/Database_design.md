# Database Design

## 1. Design Goal

The database must support the current web MVP while remaining suitable for future mobile clients and additional attendance features.

## 2. Core Entities

### Users

Suggested fields:
- id
- name
- email/username
- password_hash
- year
- branch
- role
- account_status
- created_at
- updated_at

### Meetings

Suggested fields:
- id
- title
- type
- organizer_id
- coordinator_id
- target_audience
- date
- start_time
- end_time
- location_name
- latitude (nullable for MVP/V2)
- longitude (nullable for MVP/V2)
- allowed_radius_m (nullable for V2)
- agenda
- status
- created_at
- updated_at

### Attendance

Suggested fields:
- id
- meeting_id
- user_id
- status
- marked_at
- verification_method
- latitude (future)
- longitude (future)
- location_accuracy (future)
- created_at
- updated_at

Important constraint:

```text
UNIQUE(meeting_id, user_id)
```

This prevents duplicate attendance.

### QR Sessions

Suggested fields:
- id
- meeting_id
- token_hash
- valid_from
- valid_until
- status
- created_at

Do not store unnecessary sensitive QR data.

### Leave Requests

Future/V2:
- id
- meeting_id
- user_id
- reason
- status
- reviewed_by
- reviewed_at
- created_at

### Notifications

Future/V2:
- id
- user_id
- type
- title
- message
- read_at
- created_at

### Audit Logs

Future/V2:
- id
- actor_user_id
- action
- entity_type
- entity_id
- metadata
- created_at

## 3. Relationships

```text
USER
 │
 ├──────────────► MEETING (as coordinator)
 │
 ├──────────────► ATTENDANCE
 │
 ├──────────────► LEAVE_REQUEST
 │
 ├──────────────► NOTIFICATION
 │
 └──────────────► AUDIT_LOG

MEETING
 │
 ├──────────────► ATTENDANCE
 │
 ├──────────────► QR_SESSION
 │
 └──────────────► LEAVE_REQUEST
```

## 4. Attendance Status

Initial:
- PRESENT
- ABSENT
- EXCUSED

Future:
- LATE
- MANUALLY_VERIFIED
- DISPUTED

## 5. User Status

Suggested:
- ACTIVE
- INACTIVE
- SUSPENDED
- REMOVED

A removal should be represented as a status/audit action rather than physically deleting historical attendance records.

## 6. Meeting Status

Suggested:
- DRAFT
- PENDING_APPROVAL
- REJECTED
- APPROVED
- UPCOMING
- ATTENDANCE_OPEN
- ONGOING
- CLOSED
- COMPLETED
- CANCELLED

## 7. Data Integrity Rules

1. Attendance must reference an existing user and meeting.
2. A user cannot have two attendance records for the same meeting.
3. Cancelled meetings must not generate absences.
4. Approved excused absence must be distinguishable from normal absence.
5. Historical attendance should not be physically deleted during normal administrative actions.
6. Foreign keys should be used where appropriate.
7. Timestamps should be stored consistently.

## 8. Future Database Extensions

Possible later entities:
- Teams
- Committees
- MeetingTasks
- MeetingAttachments
- AttendanceDisputes
- PushNotificationTokens
- QRRotationSessions

## Authentication implementation fields

The `users` table stores an Argon2 password hash (never the password), an email with a unique constraint, a nullable unique `attendance_id` assigned during authenticated onboarding, a server-assigned role defaulting to `MEMBER`, an account-active flag, and a creation timestamp. `attendance_id` uses `RNXG-` followed by 4–16 alphanumeric characters. Members can set it only once; it is not editable through the member endpoint.
