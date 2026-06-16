# Implementation Plan: CommerceOS Backend

We will implement the backend in 7 sequential phases following the Sprint roadmap in `backendPRD.md`.

## Phase 1: Foundation & Core Infrastructures (Sprint 1 base)
- Initialize package.json, TypeScript configurations, linting config.
- Configure `unifiedConfig.ts` to manage all variables.
- Set up global utilities (`ApiError`, `asyncErrorWrapper`, `BaseController`, standard logging via Winston).
- Set up DB Connection and the tenant Mongoose plugin / context storage (AsyncLocalStorage).
- Implement global middleware:
  - Tenant resolution middleware (`tenantResolver`).
  - Error handler middleware.
  - Rate limiter.

## Phase 2: Identity & Tenant Core (Sprint 1 modules)
- Implement **Store Module**: Store schemas, repositories, services, controllers, routes.
- Implement **Auth Module**: Session tokens (Access + Refresh JWTs), cookie-parser, route guards (`checkAuth`, `checkRole`).
- Implement **User Module**: User invite flow, user schema, user routes.

## Phase 3: Catalog & Content (Sprint 2 & 3)
- Implement **Category Module**: Hierarchical category tree (adjacency list).
- Implement **Media Module**: Multer integration and Cloudinary SDK service.
- Implement **Product Module**: Dynamic attribute definitions in stores, dynamic validation schema generator, and product CRUD.
- Implement **CMS Module**: Page layout engine using structured layouts.
- Implement **Blog Module**: Post status workflow (`DRAFT`, `PUBLISHED`, `SCHEDULED`) and cron scheduler.

## Phase 4: CRM Pipeline & Appointments (Sprint 4)
- Implement **Leads Module**: CRM pipeline and contact activities log.
- Implement **Appointment Module**: Slots allocation engine (working hours, holidays, overlapping bookings check).

## Phase 5: E-commerce Engine (Sprint 5)
- Implement **Customer Module**: Buyer directory and history.
- Implement **Orders Module**: Checkout pricing logic, Stripe / Razorpay intent generation, order state machine, payment webhook handlers.

## Phase 6: Utilities & Analytics (Sprint 6)
- Implement **Calculators Module**: Gold, EMI, Investment utility routes.
- Implement **Analytics Module**: Daily consolidated metrics cron scheduler.
- Implement **Notification Module**: Nodemailer templates dispatcher service.

## Phase 7: Admin & Deployment Configuration (Sprint 7)
- Implement Super Admin endpoints.
- Set up Swagger API docs specifications `/api/docs`.
- Set up reverse-proxy verification endpoint `/api/v1/stores/verify-domain`.
