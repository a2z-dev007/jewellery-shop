"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ChatbotConfig_1 = require("../models/ChatbotConfig");
const auth_1 = require("../../../shared/middleware/auth");
const asyncErrorWrapper_1 = require("../../../shared/utils/asyncErrorWrapper");
const router = (0, express_1.Router)();
// Public: Get widget settings
router.get('/settings', (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const config = await ChatbotConfig_1.ChatbotConfig.findOne().exec();
    if (!config) {
        // Return default config if not configured yet
        return res.json({
            success: true,
            data: {
                widgetColor: '#4f46e5',
                welcomeMessage: 'Hello! How can we help you today?',
                faqs: [],
            },
        });
    }
    res.json({ success: true, data: config });
}));
// Protected: Update chatbot configuration
router.use(auth_1.checkAuth);
router.put('/settings', (0, auth_1.checkRole)(['store_owner', 'manager']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const { widgetColor, welcomeMessage, faqs } = req.body;
    const storeId = req.storeId;
    const config = await ChatbotConfig_1.ChatbotConfig.findOneAndUpdate({}, { widgetColor, welcomeMessage, faqs, storeId }, { new: true, upsert: true }).exec();
    res.json({ success: true, data: config });
}));
exports.default = router;
