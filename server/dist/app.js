"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Register Mongoose models first to prevent circular lookup issues
require("./modules/stores/models/Store");
require("./modules/users/models/User");
require("./modules/products/models/Product");
require("./modules/categories/models/Category");
require("./modules/leads/models/Lead");
require("./modules/appointments/models/Appointment");
require("./modules/customers/models/Customer");
require("./modules/orders/models/Order");
require("./modules/blogs/models/BlogPost");
require("./modules/cms/models/CmsPage");
require("./modules/chatbot/models/ChatbotConfig");
require("./modules/analytics/models/DailyMetrics");
// Import Middlewares & Resolvers
const tenantResolver_1 = require("./shared/middleware/tenantResolver");
const rateLimiter_1 = require("./shared/middleware/rateLimiter");
const errorHandler_1 = require("./shared/middleware/errorHandler");
// Import Route Handlers
const authRoutes_1 = __importDefault(require("./modules/auth/routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./modules/users/routes/userRoutes"));
const storeRoutes_1 = __importDefault(require("./modules/stores/routes/storeRoutes"));
const domainRoutes_1 = __importDefault(require("./modules/stores/routes/domainRoutes"));
const productRoutes_1 = __importDefault(require("./modules/products/routes/productRoutes"));
const categoryRoutes_1 = __importDefault(require("./modules/categories/routes/categoryRoutes"));
const mediaRoutes_1 = __importDefault(require("./modules/media/routes/mediaRoutes"));
const cmsRoutes_1 = __importDefault(require("./modules/cms/routes/cmsRoutes"));
const blogRoutes_1 = __importDefault(require("./modules/blogs/routes/blogRoutes"));
const leadRoutes_1 = __importDefault(require("./modules/leads/routes/leadRoutes"));
const appointmentRoutes_1 = __importDefault(require("./modules/appointments/routes/appointmentRoutes"));
const customerRoutes_1 = __importDefault(require("./modules/customers/routes/customerRoutes"));
const orderRoutes_1 = __importDefault(require("./modules/orders/routes/orderRoutes"));
const calculatorRoutes_1 = __importDefault(require("./modules/calculators/routes/calculatorRoutes"));
const analyticsRoutes_1 = __importDefault(require("./modules/analytics/routes/analyticsRoutes"));
const chatbotRoutes_1 = __importDefault(require("./modules/chatbot/routes/chatbotRoutes"));
const app = (0, express_1.default)();
// Security HTTP headers
app.use((0, helmet_1.default)());
// Enable CORS
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
// Parse body requests
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Apply rate limiting
app.use(rateLimiter_1.globalRateLimiter);
// Serve uploads folder statically
app.use('/uploads', express_1.default.static('uploads'));
// Serve Swagger UI API Docs
const swaggerPath = path_1.default.join(__dirname, '../docs/swagger.json');
if (fs_1.default.existsSync(swaggerPath)) {
    const swaggerDocument = JSON.parse(fs_1.default.readFileSync(swaggerPath, 'utf8'));
    app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
}
// Apply tenant resolution globally on all routes
app.use(tenantResolver_1.tenantResolver);
// Domain TLS verification route (no prefix, as ask URL maps /api/v1/stores/verify-domain)
app.use('/api/v1/stores', domainRoutes_1.default);
// Register API Routes
app.use('/api/v1/auth', authRoutes_1.default);
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/stores', storeRoutes_1.default);
app.use('/api/v1/products', productRoutes_1.default);
app.use('/api/v1/categories', categoryRoutes_1.default);
app.use('/api/v1/media', mediaRoutes_1.default);
app.use('/api/v1/cms', cmsRoutes_1.default);
app.use('/api/v1/blogs', blogRoutes_1.default);
app.use('/api/v1/leads', leadRoutes_1.default);
app.use('/api/v1/appointments', appointmentRoutes_1.default);
app.use('/api/v1/customers', customerRoutes_1.default);
app.use('/api/v1/orders', orderRoutes_1.default);
app.use('/api/v1/calculators', calculatorRoutes_1.default);
app.use('/api/v1/analytics', analyticsRoutes_1.default);
app.use('/api/v1/chatbot', chatbotRoutes_1.default);
// Centralized error handling
app.use(errorHandler_1.errorHandler);
exports.default = app;
