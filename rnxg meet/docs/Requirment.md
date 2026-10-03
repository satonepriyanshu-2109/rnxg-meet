# Requirements

## 1. Requirement Types

- **FR** — Functional Requirement
- **NFR** — Non-Functional Requirement
- **FUTURE** — Planned later, not required for MVP

## 2. Authentication

### FR-001
Users shall be able to securely log in.

### FR-002
The system shall identify the authenticated user's role.

### FR-003
Unauthorized users shall not access protected pages or APIs.

### FR-004
Authentication failures shall return safe, non-sensitive error messages.

## 3. Roles

### FR-005
The system shall support at least:
- Admin / TY Senior
- Coordinator
- Member

### FR-006
Permissions shall be enforced on the server.

## 4. Member Management

### FR-007
Authorized admins shall be able to view members.

### FR-008
Authorized admins shall be able to manage member information.

### FR-009
Member records shall contain at least:
- Name
- Year
- Branch
- Club role
- Account status

### FR-010
The system shall maintain attendance history per member.

## 5. Meeting Management

### FR-011
A coordinator shall be able to create a meeting request.

### FR-012
A meeting shall contain:
- Meeting ID
- Title
- Type
- Coordinator
- Organizer
- Target year/group
- Date
- Start time
- End time
- Location
- Agenda
- Status

### FR-013
Meeting types shall include:
- Official
- Unofficial

### FR-014
Meetings shall support target audiences such as:
- FY
- SY
- TY
- ALL

### FR-015
An authorized admin shall approve or reject meeting requests.

### FR-016
The system shall prevent attendance activation for unapproved meetings.

## 6. QR Attendance

### FR-017
An approved meeting shall have an attendance QR session.

### FR-018
For a meeting scheduled at 5:00 PM, the default attendance window is 4:45 PM to 5:15 PM.

### FR-019
The server shall determine whether attendance is currently allowed.

### FR-020
The QR shall contain a short-lived attendance token rather than sensitive attendance data.

### FR-021
A member shall be able to scan the QR from a phone browser.

### FR-022
The system shall verify:
- authenticated user
- meeting
- QR/session token
- attendance time
- target eligibility
- duplicate attendance

### FR-023
A member shall not be able to register attendance twice for the same meeting.

## 7. Attendance

### FR-024
The system shall record successful attendance with timestamp.

### FR-025
After the attendance window closes, expected members who were neither present nor excused shall be marked absent.

### FR-026
The system shall maintain attendance history.

### FR-027
Meeting details shall show attendance according to user permissions.

## 8. Consecutive Absence

### FR-028
The system shall calculate consecutive absences for eligible meetings.

### FR-029
Official and unofficial meetings count toward the streak when the member is expected to attend.

### FR-030
Cancelled meetings shall not count.

### FR-031
Approved excused absences shall not increase the streak.

### FR-032
Two consecutive absences shall produce a warning state.

### FR-033
Three consecutive absences shall produce a critical/review state.

### FR-034
The system shall notify authorized administrators and the affected member when a critical threshold is reached.

## 9. Dashboard

### FR-035
Admins shall have a dashboard showing key system information.

Minimum dashboard data:
- Total members
- Total meetings
- Today's meetings
- Ongoing meetings
- Attendance overview
- Pending approvals
- Warning/critical attendance alerts

## 10. Meeting Records

### FR-036
Meeting details shall retain attendance information.

### FR-037
The system shall support MoM information.

### FR-038
MoM may contain:
- Summary
- Decisions
- Tasks
- Responsible members
- Deadlines
- Attachments (future enhancement)

## 11. Future Requirements

### FUTURE-001
Location verification/geofencing.

### FUTURE-002
Leave/excused absence request workflow.

### FUTURE-003
In-app and push notifications.

### FUTURE-004
Rotating QR.

### FUTURE-005
Audit logs.

### FUTURE-006
Analytics and trend reports.

### FUTURE-007
CSV/Excel/PDF exports.

### FUTURE-008
Flutter Android/iOS client.

## 12. Non-Functional Requirements

### NFR-001 — Responsiveness
The application shall work on desktop, tablet, Android browser, and iPhone browser.

### NFR-002 — Security
Sensitive operations shall be validated server-side.

### NFR-003 — Reliability
Attendance records shall not depend on the browser remaining open after a successful submission.

### NFR-004 — Maintainability
Frontend, backend, and database responsibilities shall remain reasonably separated.

### NFR-005 — Auditability
Important attendance and administrative actions should be traceable.

### NFR-006 — Usability
A member should be able to complete attendance with minimal steps.

### NFR-007 — Scalability
The API/database design should allow a future Flutter application to use the same backend.

### FR-039 — Member registration and attendance identity

A person shall be able to register with a name, unique email, and password. After registration/sign-in, an authenticated member shall set a unique RNXG Attendance ID linked to their profile. The server shall validate ID format and uniqueness; members cannot change an ID after it is set.
