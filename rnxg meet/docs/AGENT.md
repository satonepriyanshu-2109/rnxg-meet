# AGENTS.md

## Project Context
RNXG Attendance & Meeting Management System is currently a **responsive web MVP/prototype**. The immediate goal is to replace the club's notebook-based attendance workflow with a reliable, testable digital system.

**Important:** Do not implement Flutter, Dart, native Android, or native iOS as part of the current MVP. Mobile apps are a future phase after the web system is successfully tested and accepted.

## Current MVP Stack
- Frontend: React
- Backend: FastAPI / Python
- Database: PostgreSQL
- Authentication: secure token/session-based authentication
- QR: short-lived attendance QR
- Responsive web UI: desktop, tablet, Android browser, iPhone browser
- Optional real-time layer: WebSocket where useful

## Future Direction
The backend/API and database should be designed so a future Flutter application can use the same services without redesigning the core business logic.

Future features must not be implemented prematurely unless explicitly approved:
- Flutter Android/iOS application
- Push notifications
- Advanced QR rotation
- Advanced analytics
- PDF/Excel reporting
- PWA/offline enhancements
- Production-scale deployment

## Core Development Principles
1. Do not break existing working functionality while adding a feature.
2. Follow the documented requirements and business rules.
3. Keep business logic on the server wherever validation or security matters.
4. Never trust client-side time, attendance status, permissions, or location claims without server validation.
5. Use role-based access control.
6. Keep attendance records auditable.
7. Prefer simple MVP implementations over unnecessary complexity.
8. Do not invent club policies. If a policy is not documented, mark it as requiring approval.
9. Preserve backward compatibility of API/database changes where practical.
10. Update relevant documentation when architecture, requirements, business rules, or important decisions change.

## Before Implementing a Feature
Check:
- `Requirements.md`
- `Business Rules.md`
- `User Roles Permissions.md`
- `System Architecture.md`
- `Database Design.md`
- `API Specification.md`
- `UI UX Specification.md`
- `Security Rules.md`
- `Decisions.md`

## MVP Priority
Build in this order:
1. Project foundation
2. Authentication
3. Roles and permissions
4. Member management
5. Meeting management
6. Admin approval
7. QR attendance
8. Automatic attendance/absence
9. Attendance history
10. Consecutive absence detection
11. Basic dashboard

Then add approved V2 features such as geofencing, leave requests, notifications, MoM, analytics, audit logs, and reporting.

## Code Quality
- Keep frontend components modular.
- Keep backend routes, services, schemas, and database logic separated where practical.
- Validate all incoming data.
- Use meaningful names.
- Avoid hard-coded business rules in UI code.
- Use environment variables for secrets and configuration.
- Never commit passwords, tokens, private keys, or database credentials.

## Definition of Done
A feature is not considered complete until:
- It works in the UI.
- Server-side validation exists where required.
- Relevant edge cases are handled.
- Permission restrictions are tested.
- Documentation is updated if the behavior affects project rules.
- Existing functionality still works.
