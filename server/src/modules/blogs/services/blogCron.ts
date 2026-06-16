import cron from 'node-cron';
import { BlogPost } from '../models/BlogPost';
import { logger } from '../../../shared/utils/logger';

export const startBlogCron = () => {
  // Run every hour at minute 0
  cron.schedule('0 * * * *', async () => {
    try {
      logger.info('Running blog cron scheduler: Checking for scheduled posts...');
      
      const now = new Date();
      // Using skipTenantCheck to update across all stores/tenants
      const result = await BlogPost.updateMany(
        {
          status: 'SCHEDULED',
          publishedAt: { $lte: now },
        },
        {
          $set: { status: 'PUBLISHED' },
        }
      ).setOptions({ skipTenantCheck: true }).exec();

      if (result.modifiedCount > 0) {
        logger.info(`Blog cron scheduler completed: Published ${result.modifiedCount} posts`);
      }
    } catch (error: any) {
      logger.error(`Blog Cron Error: ${error.message}`);
    }
  });
};
