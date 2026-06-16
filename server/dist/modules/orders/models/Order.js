"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const tenantPlugin_1 = require("../../../shared/database/tenantPlugin");
const OrderItemSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});
const OrderSchema = new mongoose_1.Schema({
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
        default: 'PENDING',
        index: true,
    },
    paymentDetails: {
        gateway: { type: String, enum: ['stripe', 'razorpay', 'mock'], required: true },
        paymentId: { type: String },
        orderId: { type: String },
    },
    customerDetails: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String },
    },
}, { timestamps: true });
OrderSchema.index({ storeId: 1, createdAt: -1 });
OrderSchema.plugin(tenantPlugin_1.tenantPlugin);
exports.Order = (0, mongoose_1.model)('Order', OrderSchema);
