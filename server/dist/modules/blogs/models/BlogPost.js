"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPost = void 0;
const mongoose_1 = require("mongoose");
const tenantPlugin_1 = require("../../../shared/database/tenantPlugin");
const BlogPostSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    content: { type: String, required: true },
    summary: { type: String },
    featuredImage: { type: String },
    status: {
        type: String,
        enum: ['DRAFT', 'PUBLISHED', 'SCHEDULED'],
        default: 'DRAFT',
    },
    publishedAt: { type: Date },
}, { timestamps: true });
BlogPostSchema.index({ storeId: 1, slug: 1 }, { unique: true });
BlogPostSchema.index({ storeId: 1, status: 1, publishedAt: 1 });
BlogPostSchema.plugin(tenantPlugin_1.tenantPlugin);
exports.BlogPost = (0, mongoose_1.model)('BlogPost', BlogPostSchema);
