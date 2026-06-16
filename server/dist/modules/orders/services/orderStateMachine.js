"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStateMachine = exports.OrderStateMachine = void 0;
const Order_1 = require("../models/Order");
const Product_1 = require("../../products/models/Product");
const Customer_1 = require("../../customers/models/Customer");
const ApiError_1 = require("../../../shared/utils/ApiError");
const logger_1 = require("../../../shared/utils/logger");
class OrderStateMachine {
    async transitionToPaid(orderId) {
        const order = await Order_1.Order.findById(orderId).exec();
        if (!order) {
            throw ApiError_1.ApiError.notFound('Order not found');
        }
        if (order.status !== 'PENDING') {
            throw ApiError_1.ApiError.badRequest(`Order status is already ${order.status}`);
        }
        // 1. Validate stock inventory and decrement it
        for (const item of order.items) {
            const product = await Product_1.Product.findById(item.productId).exec();
            if (!product || product.stock < item.quantity) {
                throw new ApiError_1.ApiError(400, 'INSUFFICIENT_STOCK', `Insufficient stock for product: ${item.name || product?.name}`);
            }
            product.stock -= item.quantity;
            await product.save();
        }
        // 2. Set order status to PAID
        order.status = 'PAID';
        await order.save();
        // 3. Upsert customer profile
        try {
            await Customer_1.Customer.findOneAndUpdate({ email: order.customerDetails.email, storeId: order.storeId }, {
                $set: {
                    name: order.customerDetails.name,
                    phone: order.customerDetails.phone,
                },
                $inc: { loyaltyPoints: Math.floor(order.totalAmount * 0.1) }, // 10% cash back in points
            }, { upsert: true, new: true }).setOptions({ skipTenantCheck: true }).exec(); // Run globally outside scope boundaries if needed, or inside
        }
        catch (e) {
            logger_1.logger.error(`Failed to upsert customer during order paid state transition: ${e.message}`);
        }
        logger_1.logger.info(`Order ${orderId} successfully transitioned to PAID. Stock updated and customer logged.`);
        return order;
    }
    async transitionStatus(orderId, status) {
        const order = await Order_1.Order.findById(orderId).exec();
        if (!order) {
            throw ApiError_1.ApiError.notFound('Order not found');
        }
        // Cancellation logic (re-add inventory stock)
        if (status === 'CANCELLED' && order.status !== 'CANCELLED') {
            for (const item of order.items) {
                await Product_1.Product.findByIdAndUpdate(item.productId, {
                    $inc: { stock: item.quantity },
                }).exec();
            }
        }
        order.status = status;
        await order.save();
        return order;
    }
}
exports.OrderStateMachine = OrderStateMachine;
exports.orderStateMachine = new OrderStateMachine();
