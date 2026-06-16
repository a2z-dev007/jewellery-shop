# Tasks List: CommerceOS Backend

## Phase 1: Foundation & Base Setup
- [ ] Task 1.1: Project initialization & dependencies setup
  - Acceptance: `package.json`, `tsconfig.json`, eslint, prettier config files exist, all typescript base dependencies installed, project compiles.
  - Verify: Run `npm run build` to ensure it compiles without error.
  - Files: `package.json`, `tsconfig.json`, `src/server.ts`, `src/app.ts`

- [ ] Task 1.2: Global configuration and utilities setup
  - Acceptance: `unifiedConfig.ts`, `winston` logger, `ApiError` class, `asyncErrorWrapper` helper, and `BaseController` exist.
  - Verify: Create a basic test routing file and confirm compile.
  - Files: `src/config/unifiedConfig.ts`, `src/shared/utils/ApiError.ts`, `src/shared/utils/asyncErrorWrapper.ts`, `src/shared/utils/BaseController.ts`, `src/shared/utils/logger.ts`, `src/shared/constants/errorCodes.ts`

- [ ] Task 1.3: Database Setup & Multi-Tenancy Mongoose plugin
  - Acceptance: Mongoose connection setup, AsyncLocalStorage tenant context store, and `tenantPlugin` for automatic tenant isolation exist.
  - Verify: Ensure compile checks pass for database utilities.
  - Files: `src/shared/database/connection.ts`, `src/shared/database/tenantContext.ts`, `src/shared/database/tenantPlugin.ts`

- [ ] Task 1.4: Global Middlewares & Tenant Resolver
  - Acceptance: `tenantResolver`, `errorHandler`, `rateLimiter`, `auth` middlewares are implemented. `tenantResolver` maps Host headers/subdomains/X-Store-Id headers to `req.storeId`.
  - Verify: Handlers compile successfully.
  - Files: `src/shared/middleware/tenantResolver.ts`, `src/shared/middleware/errorHandler.ts`, `src/shared/middleware/rateLimiter.ts`, `src/shared/middleware/auth.ts`

## Phase 2: Core Identity Modules
- [ ] Task 2.1: Store Management Module
  - Acceptance: Store Schema (with name, slug, customDomain, businessType, activeModules, settings), Controller, Services, Repositories, and Routes.
  - Verify: Verify endpoints for creating, updating, and querying stores compile and are mapped.
  - Files: `src/modules/stores/models/Store.ts`, `src/modules/stores/repositories/StoreRepository.ts`, `src/modules/stores/services/storeService.ts`, `src/modules/stores/controllers/StoreController.ts`, `src/modules/stores/routes/storeRoutes.ts`

- [ ] Task 2.2: Auth & Session Management Module
  - Acceptance: JWT generation (AccessToken/RefreshToken), cookie-parser setup, sign-up, sign-in, and refresh token endpoints are fully functional.
  - Verify: Auth routes compile and work with JWT verification logic.
  - Files: `src/modules/auth/validators/auth.schema.ts`, `src/modules/auth/controllers/AuthController.ts`, `src/modules/auth/services/authService.ts`, `src/modules/auth/routes/authRoutes.ts`

- [ ] Task 2.3: User & Team Invitation Module
  - Acceptance: User schema with role-based fields, invite user workflow, and accept invitation endpoint.
  - Verify: Invites workflow endpoints compile and are mapped to routes.
  - Files: `src/modules/users/models/User.ts`, `src/modules/users/routes/userRoutes.ts`, `src/modules/users/controllers/UserController.ts`, `src/modules/users/services/userService.ts`

## Phase 3: Catalog & CMS Modules
- [ ] Task 3.1: Category Tree Module
  - Acceptance: Adjacency list representation for categories, supporting sub-categories.
  - Verify: Category management routes compile.
  - Files: `src/modules/categories/models/Category.ts`, `src/modules/categories/routes/categoryRoutes.ts`

- [ ] Task 3.2: Media Storage & Upload Module
  - Acceptance: Multer and Cloudinary integration middleware, with structured folder uploading `/{storeId}/{module_name}/`.
  - Verify: Media routes compile.
  - Files: `src/modules/media/routes/mediaRoutes.ts`, `src/modules/media/services/mediaService.ts`

- [ ] Task 3.3: Product Catalog & Dynamic Validator
  - Acceptance: Product schema with customAttributes map, dynamic zod schema builder matching store's custom attribute settings.
  - Verify: Catalog endpoints and validation logic compiles.
  - Files: `src/modules/products/models/Product.ts`, `src/modules/products/validators/dynamicValidator.ts`, `src/modules/products/routes/productRoutes.ts`

- [ ] Task 3.4: CMS & Blog Modules with Cron
  - Acceptance: JSON layout CMS templates and Blog posts status workflow (DRAFT/PUBLISHED/SCHEDULED) with node-cron checking for scheduled posts hourly.
  - Verify: CMS and Blog controllers/routes compile, cron runs.
  - Files: `src/modules/cms/routes/cmsRoutes.ts`, `src/modules/blogs/routes/blogRoutes.ts`, `src/modules/blogs/services/blogCron.ts`

## Phase 4: CRM & Appointments
- [ ] Task 4.1: CRM & Leads Pipeline
  - Acceptance: Lead Schema with activity logs tracker.
  - Verify: Lead routes compile.
  - Files: `src/modules/leads/routes/leadRoutes.ts`

- [ ] Task 4.2: Appointments & Availability Engine
  - Acceptance: Time-slot generation engine matching store hours, staff schedules, and existing bookings.
  - Verify: Availability calculations compile and work logically.
  - Files: `src/modules/appointments/routes/appointmentRoutes.ts`, `src/modules/appointments/services/slotsEngine.ts`

## Phase 5: Customers, E-Commerce & Webhooks
- [ ] Task 5.1: Customers Directory
  - Acceptance: Buyer profile schema and history logs.
  - Verify: Customers routes compile.
  - Files: `src/modules/customers/routes/customerRoutes.ts`

- [ ] Task 5.2: Checkout Pricing & Payment Gateways
  - Acceptance: Item calculations, tax/coupon rules, Stripe & Razorpay order creation.
  - Verify: Order initialization logic compiles.
  - Files: `src/modules/orders/routes/orderRoutes.ts`, `src/modules/orders/services/paymentService.ts`

- [ ] Task 5.3: Webhooks & Inventory Reduction State Machine
  - Acceptance: Verification of incoming payment webhooks, order state update, product inventory reduction.
  - Verify: State machine handler compiles.
  - Files: `src/modules/orders/routes/webhookRoutes.ts`, `src/modules/orders/services/orderStateMachine.ts`

## Phase 6: Calculations, Analytics & Notifications
- [ ] Task 6.1: Calculators & Analytics Engine
  - Acceptance: Calculators engine routes (Gold, EMI, Investment) and end of day metrics cron aggregator (23:59:00).
  - Verify: Calculations routes and analytics aggregator cron compiles.
  - Files: `src/modules/calculators/routes/calculatorRoutes.ts`, `src/modules/analytics/routes/analyticsRoutes.ts`, `src/modules/analytics/services/analyticsCron.ts`

- [ ] Task 6.2: Notifications Module
  - Acceptance: Email dispatch service via Nodemailer with predefined templates.
  - Verify: Mail helper compiles.
  - Files: `src/modules/notifications/services/mailService.ts`

## Phase 7: Chatbot & Admin Dashboard
- [ ] Task 7.1: Super Admin & Chatbot Setup
  - Acceptance: Platform-wide configurations and Chatbot knowledge base routing.
  - Verify: Super admin routes and chatbot routes compile.
  - Files: `src/modules/chatbot/routes/chatbotRoutes.ts`

- [ ] Task 7.2: Reverse Proxy Custom Domain Verification Endpoint
  - Acceptance: Verify custom domain API `/api/v1/stores/verify-domain` for Caddy `on_demand_tls`.
  - Verify: Route compiles and matches domains in stores.
  - Files: `src/modules/stores/routes/domainRoutes.ts`
