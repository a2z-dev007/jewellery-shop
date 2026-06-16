import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

// Register Mongoose models first to prevent circular lookup issues
import './modules/stores/models/Store';
import './modules/users/models/User';
import './modules/products/models/Product';
import './modules/categories/models/Category';
import './modules/leads/models/Lead';
import './modules/appointments/models/Appointment';
import './modules/customers/models/Customer';
import './modules/orders/models/Order';
import './modules/blogs/models/BlogPost';
import './modules/cms/models/CmsPage';
import './modules/chatbot/models/ChatbotConfig';
import './modules/analytics/models/DailyMetrics';

// Import Middlewares & Resolvers
import { tenantResolver } from './shared/middleware/tenantResolver';
import { globalRateLimiter } from './shared/middleware/rateLimiter';
import { errorHandler } from './shared/middleware/errorHandler';

// Import Route Handlers
import authRoutes from './modules/auth/routes/authRoutes';
import userRoutes from './modules/users/routes/userRoutes';
import storeRoutes from './modules/stores/routes/storeRoutes';
import domainRoutes from './modules/stores/routes/domainRoutes';
import productRoutes from './modules/products/routes/productRoutes';
import categoryRoutes from './modules/categories/routes/categoryRoutes';
import mediaRoutes from './modules/media/routes/mediaRoutes';
import cmsRoutes from './modules/cms/routes/cmsRoutes';
import blogRoutes from './modules/blogs/routes/blogRoutes';
import leadRoutes from './modules/leads/routes/leadRoutes';
import appointmentRoutes from './modules/appointments/routes/appointmentRoutes';
import customerRoutes from './modules/customers/routes/customerRoutes';
import orderRoutes from './modules/orders/routes/orderRoutes';
import calculatorRoutes from './modules/calculators/routes/calculatorRoutes';
import analyticsRoutes from './modules/analytics/routes/analyticsRoutes';
import chatbotRoutes from './modules/chatbot/routes/chatbotRoutes';

const app = express();

// Security HTTP headers
app.use(helmet());

// Enable CORS
app.use(cors({
  origin: true,
  credentials: true,
}));

// Parse body requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Apply rate limiting
app.use(globalRateLimiter);

// Serve uploads folder statically
app.use('/uploads', express.static('uploads'));

// Serve Swagger UI API Docs
const swaggerPath = path.join(__dirname, '../docs/swagger.json');
if (fs.existsSync(swaggerPath)) {
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// Apply tenant resolution globally on all routes
app.use(tenantResolver);

// Domain TLS verification route (no prefix, as ask URL maps /api/v1/stores/verify-domain)
app.use('/api/v1/stores', domainRoutes);

// Register API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/stores', storeRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/media', mediaRoutes);
app.use('/api/v1/cms', cmsRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/leads', leadRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/calculators', calculatorRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/chatbot', chatbotRoutes);

// Centralized error handling
app.use(errorHandler);

export default app;
