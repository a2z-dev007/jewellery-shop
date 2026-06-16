"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const mongoose_1 = require("mongoose");
const tenantPlugin_1 = require("../../../shared/database/tenantPlugin");
const CustomerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    loyaltyPoints: { type: Number, default: 0 },
}, { timestamps: true });
// Email unique per store
CustomerSchema.index({ storeId: 1, email: 1 }, { unique: true });
CustomerSchema.plugin(tenantPlugin_1.tenantPlugin);
exports.Customer = (0, mongoose_1.model)('Customer', CustomerSchema);
