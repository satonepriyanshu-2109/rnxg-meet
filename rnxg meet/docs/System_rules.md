# Security Rules

## 1. Purpose

Security rules protect:
- member accounts
- attendance records
- meeting information
- administrative actions
- QR attendance
- historical data

## 2. Authentication

1. Passwords must never be stored in plaintext.
2. Passwords must be securely hashed.
3. Authentication tokens/sessions must be protected.
4. Logout should invalidate the active session where applicable.
5. Protected API endpoints must require authentication.

## 3. Authorization

1. Permissions must be checked server-side.
2. Never trust a role supplied by the frontend.
3. Admin-only operations must reject normal members.
4. Coordinators must only manage meetings within their permitted scope.
5. Members cannot edit their own attendance.

## 4. QR Security

1. QR tokens must be short-lived.
2. Tokens should be unpredictable.
3. QR content should not expose sensitive user information.
4. The server must validate token expiry.
5. The server must validate that the meeting is approved and attendance is open.
6. A QR token must not allow unlimited attendance submissions.
7. Duplicate attendance must be prevented at the database level where possible.

## 5. Time Validation

The server must use its own trusted clock for:
- QR activation
- QR expiry
- attendance eligibility
- meeting state transitions

Never rely only on the user's phone/laptop clock.

## 6. Input Validation

Validate:
- login input
- meeting fields
- user fields
- QR tokens
- IDs
- dates/times
- optional location coordinates
- MoM content

Reject malformed or unexpected input.

## 7. Database Security

1. Use parameterized queries/ORM protections.
2. Do not expose database credentials.
3. Use environment variables for secrets.
4. Limit database privileges.
5. Back up production data when production deployment begins.
6. Preserve historical attendance records.

## 8. API Security

Potential protections:
- authentication
- authorization
- rate limiting
- request validation
- safe error messages
- CORS configuration
- HTTPS in production

## 9. Sensitive Information

Do not expose:
- password hashes
- authentication tokens
- internal secrets
- database credentials
- unnecessary personal information

Attendance information should only be visible to users with appropriate permissions.

## 10. Location Security — Future

When geofencing is implemented:
- Request location permission clearly.
- Validate coordinates server-side.
- Consider reported GPS accuracy.
- Store only location information that is actually required.
- Do not treat location as the only security control.

## 11. Administrative Changes

Important administrative actions should eventually be recorded in audit logs:
- meeting approval/rejection
- attendance correction
- member status change
- disciplinary status change
- major configuration changes

## 12. Frontend Security

Frontend checks improve UX but are not security boundaries.

Example:

```text
Frontend says:
"You are Admin"

Server verifies:
"Authenticated account actually has Admin permission"
```

The server decision is authoritative.

## 13. Future Security Enhancements

- Rotating QR
- Device/session management
- Stronger rate limiting
- Security headers
- CSRF protection where applicable to the selected authentication model
- Monitoring/logging
- Automated dependency scanning
- Regular backups
- Production secret management
