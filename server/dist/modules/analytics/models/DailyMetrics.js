"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyMetrics = void 0;
const mongoose_1 = require("mongoose");
const tenantPlugin_1 = require("../../../shared/database/tenantPlugin");
const DailyMetricsSchema = new mongoose_1.Schema({
    date: { type: String, required: true },
    salesTotal: { type: Number, default: 0 },
    orderCount: { type: Number, default: 0 },
    leadsCaptured: { type: Number, default: 0 },
    visits: { type: Number, default: 0 },
}, { timestamps: true });
DailyMetricsSchema.index({ storeId: 1, date: 1 }, { unique: true });
DailyMetricsSchema.plugin(tenantPlugin_1.tenantPlugin);
exports.DailyMetrics = (0, mongoose_1.model)('DailyMetrics', DailyMetricsSchema);
