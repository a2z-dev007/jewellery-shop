"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const tenantPlugin_1 = require("../../../shared/database/tenantPlugin");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    sku: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    categoryId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' },
    customAttributes: { type: Map, of: mongoose_1.Schema.Types.Mixed, default: {} },
}, { timestamps: true });
// SKU and Slug must be unique within store
ProductSchema.index({ storeId: 1, sku: 1 }, { unique: true });
ProductSchema.index({ storeId: 1, slug: 1 }, { unique: true });
ProductSchema.index({ storeId: 1, createdAt: -1 });
// Apply tenant isolation plugin
ProductSchema.plugin(tenantPlugin_1.tenantPlugin);
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
