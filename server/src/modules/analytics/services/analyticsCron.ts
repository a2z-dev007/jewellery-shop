import cron from 'node-cron';
import { DailyMetrics } from '../models/DailyMetrics';
import { Order } from '../../orders/models/Order';
import { Lead } from '../../leads/models/Lead';
import { Store } from '../../stores/models/Store';
import { logger } from '../../../shared/utils/logger';

export const startAnalyticsCron = () => {
  // Run at 23:59:00 every day
  cron.schedule('59 23 * * *', async () => {
    try {
      logger.info('Running daily analytics consolidation cron job...');
      const todayStr = new Date().toISOString().split('T')[0];

      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      // Fetch all stores to aggregate metrics per store
      const stores = await Store.find().exec();

      for (const store of stores) {
        const storeId = store._id.toString();

        // 1. Sales and Order counts (using skipTenantCheck to query properly per store)
        const orders = await Order.find({
          storeId,
          status: 'PAID',
          createdAt: { $gte: startOfDay, $lte: endOfDay },
        } as any).setOptions({ skipTenantCheck: true }).exec();

        const salesTotal = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        const orderCount = orders.length;

        // 2. Leads captured
        const leadsCount = await Lead.countDocuments({
          storeId,
          createdAt: { $gte: startOfDay, $lte: endOfDay },
        } as any).setOptions({ skipTenantCheck: true }).exec();

        // 3. Update or Insert DailyMetrics
        await DailyMetrics.findOneAndUpdate(
          { storeId, date: todayStr } as any,
          {
            $set: {
              salesTotal,
              orderCount,
              leadsCaptured: leadsCount,
            },
          },
          { upsert: true, new: true }
        ).setOptions({ skipTenantCheck: true }).exec();
      }

      logger.info('Analytics consolidation cron job completed successfully.');
    } catch (error: any) {
      logger.error(`Analytics Cron Error: ${error.message}`);
    }
  });
};
