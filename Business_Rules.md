# Business Rules

## 1. Purpose

This document contains RNXG-specific operational rules. Technical implementation must follow these rules, while club policy decisions that have not been officially approved must remain configurable or marked as pending.

## 2. Meeting Approval

1. A coordinator can create a meeting request.
2. The request goes to an authorized Admin/TY Senior.
3. The Admin approves or rejects the meeting.
4. Only approved meetings can activate attendance.
5. Rejected meetings cannot collect attendance.
6. Approved meetings may be cancelled according to permission rules.

## 3. Meeting Types

The system supports:
- Official meetings
- Unofficial meetings

Both can contribute to attendance and consecutive-absence calculations when the member is expected to attend.

## 4. Meeting Audience

A meeting may target:
- FY
- SY
- TY
- ALL
- Future: specific teams/groups

Only members included in the expected audience should be evaluated for attendance.

## 5. QR Attendance Window

Default rule:

**Meeting start time − 15 minutes → Meeting start time + 15 minutes**

Example:
- Meeting: 5:00 PM
- QR opens: 4:45 PM
- QR closes: 5:15 PM

The server clock is authoritative.

The browser/device clock must not be trusted for deciding attendance eligibility.

## 6. QR Security

The QR must represent a short-lived attendance session/token.

It should not contain:
- member attendance status
- passwords
- private user information
- permanent authentication credentials

Future enhancement: rotate the QR/token periodically during the attendance window.

## 7. Duplicate Attendance

A member can have at most one successful attendance record for a meeting.

If the member scans again:
- Do not create another attendance record.
- Return a clear message such as "Attendance already recorded."

## 8. Automatic Absence

When the attendance window closes:

**Expected Members − Present − Approved Excused = Absent**

The system should automatically produce the final attendance state.

## 9. Consecutive Absence Rule

The current club rule is based on consecutive missed eligible meetings.

- 0 consecutive absences → Normal
- 1 consecutive absence → Normal
- 2 consecutive absences → Warning
- 3 consecutive absences → Critical / Review

Official and unofficial meetings both count when the member is expected.

Cancelled meetings do not count.

Approved excused absences do not increase the streak and should normally break the absence streak according to the configured policy.

## 10. Disciplinary Action

A three-meeting absence threshold should trigger a **critical/review state**.

The system should not silently delete or permanently remove a member.

If RNXG policy requires removal from the club, the actual decision should be made by the authorized club authority and recorded as an administrative action.

Possible statuses:
- ACTIVE
- WARNING
- REVIEW_REQUIRED
- SUSPENDED
- REMOVED

The exact disciplinary workflow should remain configurable.

## 11. Leave / Excused Absence

Planned V2 workflow:
1. Member requests leave for a meeting.
2. Member provides reason.
3. Authorized admin reviews request.
4. Approved request becomes EXCUSED.
5. EXCUSED does not increase absence streak.
6. Rejected request does not protect the member from normal absence calculation.

## 12. Location Verification

Planned V2.

A meeting can have:
- latitude
- longitude
- allowed radius

The member's device/browser location can be checked during attendance.

Location should be treated as an additional validation layer rather than the only security mechanism because GPS accuracy can vary, especially indoors.

## 13. Meeting Cancellation

Cancelled meetings:
- Do not collect attendance.
- Do not create absences.
- Do not increase absence streaks.

## 14. Data Integrity

Attendance should be created only through a valid attendance workflow or an authorized administrative correction.

Members must not be able to directly edit their own attendance.

## 15. Auditability

Important actions should record:
- Actor
- Action
- Timestamp
- Related entity
- Relevant metadata where appropriate

## 16. Notifications

Potential events:
- Meeting created
- Meeting approved/rejected
- Meeting reminder
- Attendance opened
- Attendance closing soon
- Attendance successful
- QR expired
- Wrong location
- Already attended
- Warning threshold
- Critical threshold

Notification visibility must follow permissions.

## 17. Future Policy Extensions

The system should be designed so club policy can later add:
- Late attendance
- Manual verification
- Attendance disputes
- Team-specific meetings
- Rotating QR
- Attendance percentage thresholds
