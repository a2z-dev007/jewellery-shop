"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DailyMetrics_1 = require("../models/DailyMetrics");
const auth_1 = require("../../../shared/middleware/auth");
const asyncErrorWrapper_1 = require("../../../shared/utils/asyncErrorWrapper");
const router = (0, express_1.Router)();
router.use(auth_1.checkAuth);
router.get('/dashboard', (0, auth_1.checkRole)(['store_owner', 'manager']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    // Get last 30 days of metrics
    const metrics = await DailyMetrics_1.DailyMetrics.find()
        .sort({ date: -1 })
        .limit(30)
        .exec();
    res.json({ success: true, data: metrics });
}));
exports.default = router;
