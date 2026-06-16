"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lead = void 0;
const mongoose_1 = require("mongoose");
const tenantPlugin_1 = require("../../../shared/database/tenantPlugin");
const LeadActivitySchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ['status_change', 'note_added', 'email_sent'],
        required: true,
    },
    content: { type: String, required: true },
    performedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
});
const LeadSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    status: {
        type: String,
        enum: ['NEW', 'CONTACTED', 'QUALIFIED', 'LOST'],
        default: 'NEW',
        index: true,
    },
    source: { type: String, default: 'web_form' },
    activities: [LeadActivitySchema],
}, { timestamps: true });
LeadSchema.index({ storeId: 1, createdAt: -1 });
LeadSchema.plugin(tenantPlugin_1.tenantPlugin);
exports.Lead = (0, mongoose_1.model)('Lead', LeadSchema);
