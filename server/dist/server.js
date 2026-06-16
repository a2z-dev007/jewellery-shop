"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const unifiedConfig_1 = require("./config/unifiedConfig");
const connection_1 = require("./shared/database/connection");
const logger_1 = require("./shared/utils/logger");
// Schedulers
const blogCron_1 = require("./modules/blogs/services/blogCron");
const analyticsCron_1 = require("./modules/analytics/services/analyticsCron");
const startServer = async () => {
    // Connect Database
    await (0, connection_1.connectDB)();
    // Start Cron Schedulers
    (0, blogCron_1.startBlogCron)();
    (0, analyticsCron_1.startAnalyticsCron)();
    // Start Express Server
    app_1.default.listen(unifiedConfig_1.config.port, () => {
        logger_1.logger.info(`Server is running in ${unifiedConfig_1.config.env} mode on port ${unifiedConfig_1.config.port}`);
    });
};
startServer().catch((error) => {
    logger_1.logger.error(`Critical error starting server: ${error.message}`);
    process.exit(1);
});
