# 02 — Features and Module Details

## 1) User Module
- User registration
- User login
- Session persistence (token in local storage)
- Profile completion/update
- Role support: `admin`, `customer`

## 2) Admin Modules
- Event Management: create/read/update/delete events
- Venue Management: create/read/update/delete venues
- Attendee Management: create/read/update/delete attendees
- Vendor Management: create/read/update/delete vendors
- Budget Tracking: expense monitoring and overview panel

## 3) Customer Modules
- Browse venues
- Create/manage bookings
- Manage profile

## 4) Security & Access Rules
- Protected routes for role-based pages
- Customer profile completion guard before booking-related features
