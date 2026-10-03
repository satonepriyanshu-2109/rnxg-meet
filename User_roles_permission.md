# User Roles & Permissions

## 1. Roles

### Admin / TY Senior
Highest operational authority in the system.

### Coordinator
A member assigned to coordinate a particular meeting.

### Member
Regular RNXG member who attends meetings and views permitted information.

## 2. Permission Matrix

| Action | Admin | Coordinator | Member |
|---|---|---|---|
| Login | Yes | Yes | Yes |
| View own profile | Yes | Yes | Yes |
| View all members | Yes | Limited | No |
| Manage members | Yes | No | No |
| Create meeting | Yes | Yes | No |
| Edit own meeting before approval | Yes | Yes | No |
| Approve meeting | Yes | No | No |
| Reject meeting | Yes | No | No |
| Cancel meeting | Yes | Assigned/limited | No |
| Generate/activate attendance | Yes | Assigned meeting | No |
| Scan QR | Yes/optional | Yes | Yes |
| Mark own attendance | Yes/optional | Yes | Yes |
| Edit own attendance | No | No | No |
| Correct attendance manually | Yes | No by default | No |
| View own attendance history | Yes | Yes | Yes |
| View all attendance | Yes | Assigned meeting only | No |
| View meeting details | Yes | Assigned/eligible | Eligible meetings |
| Add/update MoM | Yes | Assigned meeting | No |
| View analytics | Yes | Limited/own meetings | No |
| Manage system settings | Yes | No | No |
| View audit logs | Yes | Limited future | No |
| Manage leave requests | Yes | Future limited | Submit only |
| Manage notifications | Yes | Limited | Own notifications |

## 3. Permission Principles

1. UI restrictions are not sufficient; APIs must enforce permissions.
2. A coordinator's permissions should be scoped to meetings they coordinate.
3. Members cannot approve their own meeting requests.
4. Members cannot alter their own attendance.
5. Administrative corrections should be auditable.
6. Sensitive attendance information should not automatically be exposed to every club member.

## 4. Future Roles

Possible future roles:
- Sub-admin
- Team lead
- Attendance verifier
- Department/team coordinator

These should only be added when the club requires them.
