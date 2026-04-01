# 03 — Frontend URLs and Pages

## Public Routes
- `/` → Landing page
- `/login` → Login page
- `/register` → Registration page

## Admin Routes (requires admin role)
- `/admin/dashboard` → Admin dashboard
- `/admin/events` → Event management
- `/admin/venues` → Venue management
- `/admin/attendees` → Attendee management
- `/admin/vendors` → Vendor management
- `/admin/budget` → Budget tracking

## Customer Routes (requires customer role)
- `/profile` → Customer profile
- `/venues` → Browse venues (profile completion required)
- `/bookings` → My bookings (profile completion required)

## Fallback
- `*` → Not found page
