"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Order_1 = require("../models/Order");
const Product_1 = require("../../products/models/Product");
const orderStateMachine_1 = require("../services/orderStateMachine");
const auth_1 = require("../../../shared/middleware/auth");
const ApiError_1 = require("../../../shared/utils/ApiError");
const asyncErrorWrapper_1 = require("../../../shared/utils/asyncErrorWrapper");
const router = (0, express_1.Router)();
// Public: Checkout order
router.post('/checkout', (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const { items, customerDetails, gateway } = req.body;
    const storeId = req.storeId;
    if (!storeId) {
        throw ApiError_1.ApiError.badRequest('Store context is required');
    }
    if (!items || !items.length || !customerDetails) {
        throw ApiError_1.ApiError.badRequest('Items and customerDetails are required');
    }
    // 1. Calculate price and check stock
    let totalAmount = 0;
    const orderItems = [];
    for (const entry of items) {
        const product = await Product_1.Product.findById(entry.productId).exec();
        if (!product) {
            throw ApiError_1.ApiError.notFound(`Product with ID ${entry.productId} not found`);
        }
        if (product.stock < entry.quantity) {
            throw new ApiError_1.ApiError(400, 'INSUFFICIENT_STOCK', `Insufficient stock for product: ${product.name}`);
        }
        const itemCost = product.price * entry.quantity;
        totalAmount += itemCost;
        orderItems.push({
            productId: product._id,
            name: product.name,
            quantity: entry.quantity,
            price: product.price,
        });
    }
    // 2. Save Pending Order
    const order = new Order_1.Order({
        items: orderItems,
        totalAmount,
        status: 'PENDING',
        paymentDetails: {
            gateway: gateway || 'mock',
        },
        customerDetails,
        storeId,
    });
    await order.save();
    // 3. In production, communicate with Stripe / Razorpay to return client secrets.
    // For mock/development, we'll return a simulated checkout response.
    res.status(201).json({
        success: true,
        data: {
            orderId: order._id,
            totalAmount: order.totalAmount,
            status: order.status,
            clientSecret: 'mock_stripe_client_secret_xyz',
        },
    });
}));
// Public mock endpoint to complete payment (simulating Stripe / Razorpay webhooks or client completions)
router.post('/:id/mock-pay', (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const order = await orderStateMachine_1.orderStateMachine.transitionToPaid(req.params.id);
    res.json({ success: true, data: order, message: 'Mock payment completed successfully' });
}));
// Protected order management
router.use(auth_1.checkAuth);
router.get('/', (0, auth_1.checkRole)(['store_owner', 'manager', 'staff']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '20', 10);
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
        Order_1.Order.find().sort('-createdAt').skip(skip).limit(limit).exec(),
        Order_1.Order.countDocuments().exec(),
    ]);
    res.json({ success: true, data: { items, total, page, limit } });
}));
router.put('/:id/status', (0, auth_1.checkRole)(['store_owner', 'manager', 'staff']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const { status } = req.body;
    if (!status) {
        throw ApiError_1.ApiError.badRequest('Status is required');
    }
    const order = await orderStateMachine_1.orderStateMachine.transitionStatus(req.params.id, status);
    res.json({ success: true, data: order, message: `Order status updated to ${status}` });
}));
exports.default = router;
