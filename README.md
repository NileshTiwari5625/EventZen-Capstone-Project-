# EventZen — Event Management System

EventZen is a full-stack-ready event management web application with role-based portals for **Admin** and **Customer** users.

## Tech Stack
- React + TypeScript + Vite
- TailwindCSS + shadcn/ui
- React Router
- TanStack Query
- LocalStorage-backed mock service layer (`src/services/api.ts`) that can be swapped with real backend APIs
- Docker + Nginx for containerized deployment

## Core Modules
1. User Authentication & Profile Management
2. Event Management
3. Venue Management
4. Attendee Management
5. Vendor Management
6. Budget Tracking
7. Customer Venue Browsing & Bookings

## Run Locally
```bash
npm install
npm run dev
```

## Quality Checks
```bash
npm run test -- --run
npm run build
npm run lint
```

## Docker
```bash
docker compose up --build
```

## Assignment Documentation
All required submission documents are available in `/docs`:
- `docs/01-Project-Overview.md`
- `docs/02-Features-and-Modules.md`
- `docs/03-Frontend-Routes.md`
- `docs/04-Backend-API-Endpoints.md`
- `docs/05-ER-Diagram.md`
- `docs/06-Wireframe.md`
- `docs/07-User-Flow.md`
- `docs/08-Deployment-and-Docker.md`
- `docs/09-Submission-Checklist.md`
- `docs/10-Deep-Technical-Report.md`

## Ownership Note
If you are submitting individually, update the **Author** details in documentation files before submission.
