"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAnalyticsCron = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const DailyMetrics_1 = require("../models/DailyMetrics");
const Order_1 = require("../../orders/models/Order");
const Lead_1 = require("../../leads/models/Lead");
const Store_1 = require("../../stores/models/Store");
const logger_1 = require("../../../shared/utils/logger");
const startAnalyticsCron = () => {
    // Run at 23:59:00 every day
    node_cron_1.default.schedule('59 23 * * *', async () => {
        try {
            logger_1.logger.info('Running daily analytics consolidation cron job...');
            const todayStr = new Date().toISOString().split('T')[0];
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            // Fetch all stores to aggregate metrics per store
            const stores = await Store_1.Store.find().exec();
            for (const store of stores) {
                const storeId = store._id.toString();
                // 1. Sales and Order counts (using skipTenantCheck to query properly per store)
                const orders = await Order_1.Order.find({
                    storeId,
                    status: 'PAID',
                    createdAt: { $gte: startOfDay, $lte: endOfDay },
                }).setOptions({ skipTenantCheck: true }).exec();
                const salesTotal = orders.reduce((sum, order) => sum + order.totalAmount, 0);
                const orderCount = orders.length;
                // 2. Leads captured
                const leadsCount = await Lead_1.Lead.countDocuments({
                    storeId,
                    createdAt: { $gte: startOfDay, $lte: endOfDay },
                }).setOptions({ skipTenantCheck: true }).exec();
                // 3. Update or Insert DailyMetrics
                await DailyMetrics_1.DailyMetrics.findOneAndUpdate({ storeId, date: todayStr }, {
                    $set: {
                        salesTotal,
                        orderCount,
                        leadsCaptured: leadsCount,
                    },
                }, { upsert: true, new: true }).setOptions({ skipTenantCheck: true }).exec();
            }
            logger_1.logger.info('Analytics consolidation cron job completed successfully.');
        }
        catch (error) {
            logger_1.logger.error(`Analytics Cron Error: ${error.message}`);
        }
    });
};
exports.startAnalyticsCron = startAnalyticsCron;
