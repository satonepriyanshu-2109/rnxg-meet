# API Specification

## 1. API Principles

- REST-first for MVP.
- JSON request/response format.
- Authentication required for protected endpoints.
- Authorization enforced server-side.
- Consistent error responses.
- API should remain usable by a future Flutter client.

Base path:

`/api`

## 2. Authentication

### POST `/api/auth/login`
Purpose: Authenticate a user.

Request:
```json
{
  "email": "member@example.com",
  "password": "********"
}
```

Response should contain an authenticated session/token according to the selected authentication implementation.

### POST `/api/auth/logout`
Purpose: End the current session.

### GET `/api/auth/me`
Purpose: Return authenticated user information and role.

## 3. Members

### GET `/api/members`
Admin-only member listing.

### GET `/api/members/{id}`
View a member according to permission rules.

### POST `/api/members`
Create member. Admin only.

### PATCH `/api/members/{id}`
Update member. Admin only.

## 4. Meetings

### GET `/api/meetings`
List meetings visible to the authenticated user.

### GET `/api/meetings/{id}`
Get meeting details.

### POST `/api/meetings`
Create meeting request.

### PATCH `/api/meetings/{id}`
Edit an eligible meeting.

### POST `/api/meetings/{id}/approve`
Approve meeting. Admin only.

### POST `/api/meetings/{id}/reject`
Reject meeting. Admin only.

### POST `/api/meetings/{id}/cancel`
Cancel meeting according to permissions.

## 5. QR Attendance

### POST `/api/meetings/{id}/attendance-session`
Create/activate an attendance session for an approved meeting.

Server must calculate the allowed time window.

### GET `/api/meetings/{id}/attendance-session`
Return permitted session information.

### POST `/api/attendance/scan`
Validate a scanned attendance token.

Example:
```json
{
  "token": "short-lived-token"
}
```

Future location payload:
```json
{
  "token": "short-lived-token",
  "latitude": 18.0000,
  "longitude": 73.0000,
  "accuracy": 12.5
}
```

The server should validate:
- token
- meeting
- time
- user
- audience
- duplicate attendance
- location when enabled

## 6. Attendance

### GET `/api/meetings/{id}/attendance`
Return meeting attendance according to permissions.

### GET `/api/users/{id}/attendance`
Return member attendance history according to permissions.

### POST `/api/meetings/{id}/close`
Close attendance/meeting workflow when authorized.

### POST `/api/attendance/{id}/correction`
Future/admin-only attendance correction.

## 7. Dashboard

### GET `/api/dashboard/summary`
Return:
- member count
- meeting count
- today's meetings
- pending approvals
- attendance summary
- warning/critical alerts

## 8. Leave Requests — Future

### POST `/api/meetings/{id}/leave`
Submit leave request.

### GET `/api/leave-requests`
List permitted requests.

### POST `/api/leave-requests/{id}/approve`
Approve request.

### POST `/api/leave-requests/{id}/reject`
Reject request.

## 9. Notifications — Future

### GET `/api/notifications`
List current user's notifications.

### POST `/api/notifications/{id}/read`
Mark notification as read.

## 10. Audit Logs — Future

### GET `/api/audit-logs`
Admin-only audit history.

## 11. Error Format

Recommended:

```json
{
  "error": {
    "code": "QR_EXPIRED",
    "message": "Attendance is currently closed."
  }
}
```

Potential error codes:
- INVALID_CREDENTIALS
- UNAUTHORIZED
- FORBIDDEN
- MEETING_NOT_FOUND
- MEETING_NOT_APPROVED
- ATTENDANCE_NOT_OPEN
- QR_EXPIRED
- INVALID_QR
- ALREADY_ATTENDED
- NOT_ELIGIBLE
- OUTSIDE_LOCATION
- VALIDATION_ERROR

## 12. API Security

- Never trust role values sent by frontend.
- Never trust client time for attendance validation.
- Validate all request bodies.
- Rate-limit sensitive endpoints where appropriate.
- Do not expose password hashes.
- Do not expose internal database errors to users.
