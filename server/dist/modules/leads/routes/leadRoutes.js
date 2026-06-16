"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Lead_1 = require("../models/Lead");
const auth_1 = require("../../../shared/middleware/auth");
const ApiError_1 = require("../../../shared/utils/ApiError");
const asyncErrorWrapper_1 = require("../../../shared/utils/asyncErrorWrapper");
const router = (0, express_1.Router)();
// Public route: Web contact form lead submission (requires storeId context)
router.post('/submit', (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const { name, email, phone, source } = req.body;
    const storeId = req.storeId;
    if (!storeId) {
        throw ApiError_1.ApiError.badRequest('Store context is required');
    }
    if (!name || !email) {
        throw ApiError_1.ApiError.badRequest('Name and email are required');
    }
    const lead = new Lead_1.Lead({
        name,
        email,
        phone,
        source: source || 'web_form',
        activities: [
            {
                type: 'note_added',
                content: 'Lead captured automatically from web form submit',
                createdAt: new Date(),
            },
        ],
        storeId,
    });
    await lead.save();
    res.status(201).json({ success: true, data: lead, message: 'Lead submitted successfully' });
}));
// Protected routes (Dashboard CRM operations)
router.use(auth_1.checkAuth);
router.get('/', (0, auth_1.checkRole)(['store_owner', 'manager']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '20', 10);
    const status = req.query.status;
    const query = {};
    if (status)
        query.status = status;
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
        Lead_1.Lead.find(query).sort('-createdAt').skip(skip).limit(limit).exec(),
        Lead_1.Lead.countDocuments(query).exec(),
    ]);
    res.json({ success: true, data: { items, total, page, limit } });
}));
router.get('/:id', (0, auth_1.checkRole)(['store_owner', 'manager']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const lead = await Lead_1.Lead.findById(req.params.id).exec();
    if (!lead) {
        throw ApiError_1.ApiError.notFound('Lead not found');
    }
    res.json({ success: true, data: lead });
}));
router.put('/:id/status', (0, auth_1.checkRole)(['store_owner', 'manager']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const { status } = req.body;
    if (!status) {
        throw ApiError_1.ApiError.badRequest('Status is required');
    }
    const lead = await Lead_1.Lead.findById(req.params.id);
    if (!lead) {
        throw ApiError_1.ApiError.notFound('Lead not found');
    }
    const oldStatus = lead.status;
    lead.status = status;
    lead.activities.push({
        type: 'status_change',
        content: `Status updated from ${oldStatus} to ${status}`,
        performedBy: req.user?.id,
        createdAt: new Date(),
    });
    await lead.save();
    res.json({ success: true, data: lead });
}));
router.post('/:id/activity', (0, auth_1.checkRole)(['store_owner', 'manager']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const { type, content } = req.body;
    if (!type || !content) {
        throw ApiError_1.ApiError.badRequest('Activity type and content are required');
    }
    const lead = await Lead_1.Lead.findById(req.params.id);
    if (!lead) {
        throw ApiError_1.ApiError.notFound('Lead not found');
    }
    lead.activities.push({
        type,
        content,
        performedBy: req.user?.id,
        createdAt: new Date(),
    });
    await lead.save();
    res.json({ success: true, data: lead });
}));
exports.default = router;
