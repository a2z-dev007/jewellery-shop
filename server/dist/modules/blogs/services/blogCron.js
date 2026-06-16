"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startBlogCron = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const BlogPost_1 = require("../models/BlogPost");
const logger_1 = require("../../../shared/utils/logger");
const startBlogCron = () => {
    // Run every hour at minute 0
    node_cron_1.default.schedule('0 * * * *', async () => {
        try {
            logger_1.logger.info('Running blog cron scheduler: Checking for scheduled posts...');
            const now = new Date();
            // Using skipTenantCheck to update across all stores/tenants
            const result = await BlogPost_1.BlogPost.updateMany({
                status: 'SCHEDULED',
                publishedAt: { $lte: now },
            }, {
                $set: { status: 'PUBLISHED' },
            }).setOptions({ skipTenantCheck: true }).exec();
            if (result.modifiedCount > 0) {
                logger_1.logger.info(`Blog cron scheduler completed: Published ${result.modifiedCount} posts`);
            }
        }
        catch (error) {
            logger_1.logger.error(`Blog Cron Error: ${error.message}`);
        }
    });
};
exports.startBlogCron = startBlogCron;
