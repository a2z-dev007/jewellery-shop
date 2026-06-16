"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const tenantPlugin_1 = require("../../../shared/database/tenantPlugin");
const CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    parentId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', default: null },
}, { timestamps: true });
// Ensure unique category slug per tenant
CategorySchema.index({ storeId: 1, slug: 1 }, { unique: true });
CategorySchema.index({ storeId: 1, parentId: 1 });
// Apply tenant isolation plugin
CategorySchema.plugin(tenantPlugin_1.tenantPlugin);
exports.Category = (0, mongoose_1.model)('Category', CategorySchema);
