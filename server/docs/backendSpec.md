# Spec: CommerceOS Backend

## Objective
To build the backend for CommerceOS, a reusable multi-business commerce platform (starting with JewelleryOS). It is a Modular Monolith backend written in TypeScript using Express.js and Mongoose (MongoDB). It implements a Single Database, Shared Schema multi-tenancy model to support multiple white-labeled stores.

## Tech Stack
*   **Runtime:** Node.js (v20+ LTS)
*   **Framework:** Express.js with TypeScript
*   **Database:** MongoDB via Mongoose (with tenant isolation plugin)
*   **Validation:** Zod
*   **Security:** Helmet, CORS, Express Rate Limit, bcrypt, cookie-parser, jsonwebtoken
*   **Logging:** Winston (JSON format)
*   **API Documentation:** Swagger UI (swagger-jsdoc & swagger-ui-express)
*   **File Upload:** Multer & Cloudinary SDK
*   **Email:** Nodemailer
*   **Scheduler:** node-cron

## Commands
*   **Initialize/Install:** `npm install`
*   **Build:** `npm run build` (tsc)
*   **Dev Mode:** `npm run dev` (ts-node-dev)
*   **Start Production:** `npm run start` (node dist/server.js)
*   **Lint:** `npm run lint`

## Project Structure
We follow the PRD module-based structure combined with the `backend-dev-guidelines` layered pattern (`Routes -> Controllers -> Services -> Repositories -> Database`):

```txt
src/
├── config/                  # Global configuration (unifiedConfig, DB connection, Cloudinary)
├── shared/                  # Reusable utility code across modules
│   ├── middleware/          # Global middleware (auth, tenant resolution, rate limiter, error handler)
│   ├── utils/               # Helpers (API responses, custom error classes, BaseController)
│   ├── constants/           # Error codes, role definitions, enum limits
│   └── database/            # Global connection pools and transaction helpers
└── modules/                 # Self-contained business modules
    ├── auth/                # Sign-in, sign-up, refresh, password resets
    ├── users/               # Administrative platform users
    ├── stores/              # Tenant configuration, dynamic settings, modules state
    ├── products/            # Catalog, dynamic attributes, pricing matrices
    ├── categories/          # Hierarchical category trees
    ├── media/               # Upload handlers, directory structures
    ├── cms/                 # Custom layout engines (page templates, layout JSON)
    ├── blogs/               # Articles, publish schedulers
    ├── leads/               # CRM Pipeline, contact submissions, event logs
    ├── appointments/        # Time-slot bookings, calendars, availability engine
    ├── customers/           # Buyer profile directories, purchase histories
    ├── orders/              # Carts, checkouts, payment processing, tax logic
    ├── calculators/         # Domain calculators (Gold, EMI, Investment)
    ├── analytics/           # Ingest engines, daily agg aggregators
    └── chatbot/             # Chat widget config, FAQ mapping, document vectors
```

For each module, the layered pattern is enforced within its own folder:
- `modules/<module_name>/routes/`
- `modules/<module_name>/controllers/`
- `modules/<module_name>/services/`
- `modules/<module_name>/repositories/`
- `modules/<module_name>/models/` (Mongoose Schemas/Models)
- `modules/<module_name>/validators/` (Zod Schemas)

## Code Style
*   **Imports:** Clean and grouped. Use absolute paths or module aliases if configured.
*   **Naming Conventions:**
    *   Controllers: `PascalCaseController.ts` (e.g. `AuthController.ts`)
    *   Services: `camelCaseService.ts` (e.g. `authService.ts`)
    *   Repositories: `PascalCaseRepository.ts` (e.g. `AuthRepository.ts`)
    *   Routes: `camelCaseRoutes.ts` (e.g. `authRoutes.ts`)
    *   Validators: `camelCase.schema.ts` (e.g. `auth.schema.ts`)
*   **Async Handlers:** Wrapped with `asyncErrorWrapper` helper.
*   **Type Safety:** Strict TS. Avoid `any`. Define interfaces for all request inputs/outputs.
*   **BaseController:** All controllers must extend `BaseController`.

```typescript
// Example: src/shared/utils/BaseController.ts
import { Response } from 'express';

export class BaseController {
  protected handleSuccess(res: Response, data: any, message = 'Success', status = 200) {
    res.status(status).json({
      success: true,
      data,
      message,
    });
  }

  protected handleError(res: Response, error: any) {
    const status = error.statusCode || 500;
    res.status(status).json({
      success: false,
      error: {
        code: error.errorCode || 'INTERNAL_SERVER_ERROR',
        message: error.message || 'An unexpected error occurred',
        details: error.details || null,
      },
    });
  }
}
```

## Testing Strategy
*   We will use standard Node.js test runner (`node:test`) or Vitest for testing unit/integration logic.
*   Focus on:
    1. Tenant Isolation verification (ensuring queries filter by `storeId`).
    2. Authentication and role-based permissions validation.
    3. Product catalog dynamic validation logic.

## Boundaries
*   **Always:** Use the tenant-isolation query helper plugin for Mongoose collections containing tenant data.
*   **Always:** Validate input requests using Zod schemas before hitting controllers.
*   **Never:** Import models of module A directly into services of module B. (Use services to communicate).
*   **Never:** Access `process.env` outside of `src/config/unifiedConfig.ts`.

## Success Criteria
1. The Express server compiles, runs, and resolves tenant queries based on domain / headers.
2. Complete REST APIs for all 15 modules as described in `backendPRD.md` with full Zod input validation and standard response format.
3. Successful tenant isolation validated via Mongoose plugin.
4. Auto-generated API documentation (Swagger) accessible at `/api/docs`.
5. Background schedulers (cron) for blogs and analytics operating cleanly.

## Open Questions & Assumptions
1. **Cloudinary/SMTP Configuration:** We will set up mock implementations for Cloudinary, Nodemailer, and Payment gateways if actual credentials are not provided, using configuration variables so they can be easily replaced in production.
2. **Super Admin Creation:** We assume a seed script or initial setup route is required to bootstrap the first super_admin user and store.
