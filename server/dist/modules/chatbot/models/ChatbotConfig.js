"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotConfig = void 0;
const mongoose_1 = require("mongoose");
const tenantPlugin_1 = require("../../../shared/database/tenantPlugin");
const FaqItemSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
});
const ChatbotConfigSchema = new mongoose_1.Schema({
    widgetColor: { type: String, default: '#4f46e5' },
    welcomeMessage: { type: String, default: 'Hello! How can we help you today?' },
    faqs: [FaqItemSchema],
}, { timestamps: true });
ChatbotConfigSchema.plugin(tenantPlugin_1.tenantPlugin);
exports.ChatbotConfig = (0, mongoose_1.model)('ChatbotConfig', ChatbotConfigSchema);
