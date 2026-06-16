import app from './app';
import { config } from './config/unifiedConfig';
import { connectDB } from './shared/database/connection';
import { logger } from './shared/utils/logger';

// Schedulers
import { startBlogCron } from './modules/blogs/services/blogCron';
import { startAnalyticsCron } from './modules/analytics/services/analyticsCron';

const startServer = async () => {
  // Connect Database
  await connectDB();

  // Start Cron Schedulers
  startBlogCron();
  startAnalyticsCron();

  // Start Express Server
  app.listen(config.port, () => {
    logger.info(`Server is running in ${config.env} mode on port ${config.port}`);
  });
};

startServer().catch((error) => {
  logger.error(`Critical error starting server: ${error.message}`);
  process.exit(1);
});
