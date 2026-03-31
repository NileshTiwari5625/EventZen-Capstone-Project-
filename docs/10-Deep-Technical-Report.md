# 10 — Deep Technical Report (Admin + Customer Portals)

## 1) Executive Technical Summary
EventZen is a React + TypeScript single-page application (SPA) built with Vite and styled with TailwindCSS + shadcn/ui (Radix UI primitives). It implements role-based experiences for two portals:
- **Admin Portal**: operational management of events, venues, attendees, vendors, and budgets.
- **Customer Portal**: venue discovery, booking lifecycle, and profile management.

The project currently uses a **localStorage-backed service layer** as a mock backend abstraction, designed so API calls can later be swapped to a real REST backend without rewriting page-level UX patterns.

---

## 2) Architecture and Rendering Model

### 2.1 SPA Bootstrapping
- App bootstraps from `main.tsx` via `createRoot(...)` and renders a unified `<App />`.
- Routing and access control are fully client-side through `react-router-dom`.

### 2.2 Route Topology
- Public: `/`, `/login`, `/register`.
- Admin: `/admin/dashboard`, `/admin/events`, `/admin/venues`, `/admin/attendees`, `/admin/vendors`, `/admin/budget`.
- Customer: `/profile`, `/venues`, `/bookings`.
- `*` fallback to `NotFound`.

This route topology gives a clear separation between role contexts while preserving a shared shell structure.

### 2.3 Portal Shell Components
- **AdminLayout**: persistent sidebar + mobile nav with role-specific navigation targets.
- **CustomerLayout**: top navigation with customer-focused actions (venues, bookings, profile).

This is a common **layout-route composition** pattern where `Outlet` renders child pages inside role-specific chrome.

---

## 3) Access Control, AuthN/AuthZ, and Session Strategy

### 3.1 Auth Service Semantics
`authService` performs:
- registration,
- login,
- logout,
- current-user session retrieval,
- profile updates.

### 3.2 Session Persistence
- Session state is persisted in `localStorage` key `eventzen_user`.
- Registered users are persisted in `eventzen_auth_users`.

### 3.3 Authorization Guarding
- `ProtectedRoute` enforces authentication and role checks (`admin` vs `customer`).
- `ProfileCompletionRoute` enforces customer profile completion before sensitive flows (venues/bookings).

This implements **coarse-grained client-side authorization** and **stateful session gating**.

---

## 4) Data Access Layer and Domain Modeling

### 4.1 Service Layer
`src/services/api.ts` provides:
- generic CRUD factory (`createCrudService<T>()`) over localStorage collections,
- typed domain interfaces: `Event`, `Venue`, `Attendee`, `Vendor`, `Booking`, `User`.

This follows a **repository-like abstraction** where UI components consume service APIs instead of directly reading storage.

### 4.2 Domain Entities
- **Event**: schedule, venue text, status, attendee count, budget.
- **Venue**: city/location, capacity, pricing, amenities, rating.
- **Booking**: venue linkage by name, event label, date, status, total.
- **Attendee/Vendor**: operational entities for admin workflows.

### 4.3 Seed + Migration Utilities
- Mock data initializes services.
- Legacy booking cleanup utility removes outdated sample records on startup.

This demonstrates **data migration hygiene** even in a local mock context.

---

## 5) Admin Portal — Technical Depth

### 5.1 Information Architecture
Admin navigation exposes these modules:
1. Dashboard
2. Events
3. Venues
4. Attendees
5. Vendors
6. Budget

### 5.2 Admin Dashboard Analytics Stack
`AdminDashboard` composes KPI cards + charts using `recharts`:
- line chart (trend visualization),
- pie chart (status distribution),
- bar chart (budget/attendee cross-comparison).

The dashboard computes aggregate metrics (total budget, total attendees, averages) from service data at render-time. This is a **derived-state analytics** pattern.

### 5.3 CRUD Modules
Admin pages use:
- controlled form state,
- CRUD dialogs for create/edit/delete,
- toast-based UX feedback,
- tabular views for scanability.

This yields a classic **admin CRUD control plane** design.

### 5.4 Budget Module
Budget is now an explicit portal module with dedicated route/page wrapper (`AdminBudget`), making it discoverable in both desktop and mobile nav.

---

## 6) Customer Portal — Technical Depth

### 6.1 Venue Discovery Engine
`BrowseVenues` supports:
- free-text search,
- city-based filtering (`datalist` + quick city chips),
- card-based venue listing with metadata (capacity, rating, INR/day pricing).

Filtering uses `useMemo`, a **render optimization** avoiding recomputation unless dependencies change.

### 6.2 Booking Creation Flow
- Customer opens booking dialog from a venue card.
- Submits event label + date.
- `bookingService.create(...)` persists booking with default `pending` status.

This is a **form-driven transactional flow** with optimistic UX toast feedback.

### 6.3 Booking Timeline State Machine
`MyBookings` transforms booking status/date into timeline stages:
- request submitted,
- venue review,
- booking confirmed,
- event day,
- completed.

It derives step state (`done`, `active`, `upcoming`) and sorts bookings by status priority + date. This is effectively a lightweight **finite progression model** for customer clarity.

### 6.4 Customer Profile Governance
Profile capture/update ensures contact completeness before booking actions. This acts as **policy enforcement** for data quality.

---

## 7) UI System and Design Engineering

### 7.1 Component System
- shadcn/ui-style components with Radix primitives.
- Utility-first styling with TailwindCSS.
- `cn(...)` class composition helper.

### 7.2 Interaction Patterns
- Dialog-driven mutations (CRUD dialog),
- Toast notifications for command outcomes,
- Responsive layouts (desktop sidebar + mobile horizontal nav).

### 7.3 Visual Semantics
- iconography from `lucide-react`,
- semantic badge/status coloring,
- gradient-based call-to-action emphasis.

---

## 8) Toolchain, DX, and Quality Controls

### 8.1 Build/Test/Lint Stack
- **Vite** for dev server and production bundling.
- **Vitest** for tests.
- **ESLint** for static analysis.
- **TypeScript** for compile-time type safety.

### 8.2 PostCSS/Tailwind Pipeline
- TailwindCSS + Autoprefixer.
- `tailwindcss-animate` plugin for motion utilities.

### 8.3 Dockerized Delivery
- `Dockerfile` + `docker-compose.yml` + `nginx.conf` provide containerized static deployment.

---

## 9) Security Posture (Current vs Production-Grade)

### Current Implementation (educational/mock)
- auth/session in localStorage,
- client-side route guards,
- no server-issued JWT validation.

### Production Upgrade Path
- backend-issued short-lived access tokens + refresh flow,
- secure HTTP-only cookies,
- server-side RBAC enforcement,
- input validation and audit logging,
- centralized API error contracts.

---

## 10) Data Flow Walkthroughs

### 10.1 Admin CRUD Loop
1. Page loads records from service.
2. User mutates via form/dialog.
3. Service writes to localStorage.
4. UI refreshes from source collection.

### 10.2 Customer Booking Loop
1. User filters venues by city/search.
2. User books venue via dialog.
3. Booking persisted with `pending`.
4. Timeline view materializes progression semantics.

---

## 11) Strengths and Limits

### Strengths
- Clean modular portal split.
- Strong component reuse and route guards.
- Readable service abstraction enabling backend swap.
- User-centric booking timeline UX.

### Limits
- Local-only persistence (no shared multi-user backend state).
- Client-side auth model is not production secure.
- Some dashboard figures are illustrative/mock.

---

## 12) Conclusion
EventZen is architected as a well-structured, role-based SPA with clear separation of operational concerns between **Admin** and **Customer** portals. It demonstrates modern frontend engineering practices (typed services, route guards, composable UI primitives, chart-based observability, and workflow-driven UX) while remaining intentionally backend-agnostic for future API integration.
