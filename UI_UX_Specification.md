# UI/UX Specification

## 1. Design Goal

The UI should feel like a real internal club management system, not a generic AI-generated dashboard.

Priorities:
- Clean
- Minimal
- Professional
- Fast to understand
- Mobile responsive
- Low visual clutter

## 2. Responsive Targets

The MVP should work on:
- Desktop
- Laptop
- Tablet
- Android browser
- iPhone browser

## 3. Visual Direction

Recommended direction:
- 2–3 primary colors
- Neutral background
- Clear status colors
- Space Grotesk or a similarly clean modern font
- Consistent spacing
- Clear hierarchy
- Avoid excessive gradients, cards, animations, and decorative elements

## 4. Core Screens

### Authentication
- Login
- Session/error states

### Member
- Dashboard
- Upcoming meetings
- QR scanner
- Attendance confirmation
- Attendance history
- Profile
- Notifications (future)
- Leave requests (future)

### Coordinator
- Dashboard
- Create meeting
- My meetings
- Meeting details
- Attendance monitor
- MoM

### Admin
- Dashboard
- Pending approvals
- Meetings
- Members
- Attendance
- Alerts
- Analytics
- Settings
- Audit logs (future)

## 5. Meeting Creation

Fields:
- Title
- Type
- Target audience
- Date
- Start time
- End time
- Location
- Agenda
- Coordinator

The UI should clearly display:
`Draft → Pending Approval → Approved → Upcoming → Attendance Open → Closed → Completed`

## 6. QR Attendance Screen

Must clearly show:
- Meeting name
- Attendance status
- QR scanner
- Time remaining
- Success/failure message

Possible states:
- Not yet open
- Open
- Successful
- Already attended
- Expired
- Invalid QR
- Not eligible
- Wrong location (future)

## 7. Dashboard

Avoid showing everything at once.

Recommended hierarchy:
1. Important alerts
2. Today's/ongoing meetings
3. Pending approvals
4. Attendance overview
5. Secondary analytics

## 8. Status Colors

Use consistent semantics:
- Normal/success
- Warning
- Critical/error
- Neutral/info

Do not rely only on color; pair status colors with text/icons for accessibility.

## 9. Forms

Forms should:
- Show clear labels.
- Validate input.
- Explain errors near the relevant field.
- Prevent accidental duplicate submissions.
- Show loading states.

## 10. Empty States

Every list should have a useful empty state.

Examples:
- No upcoming meetings
- No pending approvals
- No attendance history
- No notifications

## 11. Mobile UX

Important mobile considerations:
- Large tap targets
- Simple navigation
- Camera access for QR
- Minimal scrolling during attendance
- Clear permission prompts
- Location permission explanation when geofencing is introduced

## 12. Future Screens

- Leave request
- Analytics
- Reports
- Audit logs
- Notification center
- Advanced attendance verification
- Flutter mobile screens
