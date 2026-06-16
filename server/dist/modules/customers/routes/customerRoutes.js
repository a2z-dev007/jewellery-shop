"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Customer_1 = require("../models/Customer");
const auth_1 = require("../../../shared/middleware/auth");
const ApiError_1 = require("../../../shared/utils/ApiError");
const asyncErrorWrapper_1 = require("../../../shared/utils/asyncErrorWrapper");
const router = (0, express_1.Router)();
router.use(auth_1.checkAuth);
router.get('/', (0, auth_1.checkRole)(['store_owner', 'manager', 'staff']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '20', 10);
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
        Customer_1.Customer.find().skip(skip).limit(limit).exec(),
        Customer_1.Customer.countDocuments().exec(),
    ]);
    res.json({ success: true, data: { items, total, page, limit } });
}));
router.get('/:id', (0, auth_1.checkRole)(['store_owner', 'manager', 'staff']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const customer = await Customer_1.Customer.findById(req.params.id).exec();
    if (!customer) {
        throw ApiError_1.ApiError.notFound('Customer not found');
    }
    res.json({ success: true, data: customer });
}));
router.post('/', (0, auth_1.checkRole)(['store_owner', 'manager', 'staff']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const { name, email, phone } = req.body;
    const storeId = req.storeId;
    if (!name || !email) {
        throw ApiError_1.ApiError.badRequest('Name and email are required');
    }
    const customer = new Customer_1.Customer({
        name,
        email,
        phone,
        storeId,
    });
    await customer.save();
    res.status(201).json({ success: true, data: customer });
}));
exports.default = router;
