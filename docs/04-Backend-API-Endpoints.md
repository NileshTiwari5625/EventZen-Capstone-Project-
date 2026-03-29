# 04 — Implemented Backend Endpoints (Service Layer Contract)

> Note: Current implementation uses a local mock service (`src/services/api.ts`) with localStorage.
> The following endpoint design reflects the equivalent REST API contract for backend implementation.

## Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `PUT /api/auth/profile`

## Events
- `GET /api/events`
- `GET /api/events/{id}`
- `POST /api/events`
- `PUT /api/events/{id}`
- `DELETE /api/events/{id}`

## Venues
- `GET /api/venues`
- `GET /api/venues/{id}`
- `POST /api/venues`
- `PUT /api/venues/{id}`
- `DELETE /api/venues/{id}`

## Attendees
- `GET /api/attendees`
- `GET /api/attendees/{id}`
- `POST /api/attendees`
- `PUT /api/attendees/{id}`
- `DELETE /api/attendees/{id}`

## Vendors
- `GET /api/vendors`
- `GET /api/vendors/{id}`
- `POST /api/vendors`
- `PUT /api/vendors/{id}`
- `DELETE /api/vendors/{id}`

## Bookings
- `GET /api/bookings`
- `GET /api/bookings/{id}`
- `POST /api/bookings`
- `PUT /api/bookings/{id}`
- `DELETE /api/bookings/{id}`
