"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BlogPost_1 = require("../models/BlogPost");
const auth_1 = require("../../../shared/middleware/auth");
const ApiError_1 = require("../../../shared/utils/ApiError");
const asyncErrorWrapper_1 = require("../../../shared/utils/asyncErrorWrapper");
const router = (0, express_1.Router)();
// Public route to view published posts
router.get('/', (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '20', 10);
    const query = { status: 'PUBLISHED' };
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
        BlogPost_1.BlogPost.find(query).sort('-publishedAt').skip(skip).limit(limit).exec(),
        BlogPost_1.BlogPost.countDocuments(query).exec(),
    ]);
    res.json({ success: true, data: { items, total, page, limit } });
}));
// Get post by slug
router.get('/slug/:slug', (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const post = await BlogPost_1.BlogPost.findOne({ slug: req.params.slug, status: 'PUBLISHED' }).exec();
    if (!post) {
        throw ApiError_1.ApiError.notFound('Blog post not found');
    }
    res.json({ success: true, data: post });
}));
// Protected routes (Create, Update, Delete, List all for admins)
router.use(auth_1.checkAuth);
router.get('/admin/list', (0, auth_1.checkRole)(['store_owner', 'manager']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '20', 10);
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
        BlogPost_1.BlogPost.find().sort('-createdAt').skip(skip).limit(limit).exec(),
        BlogPost_1.BlogPost.countDocuments().exec(),
    ]);
    res.json({ success: true, data: { items, total, page, limit } });
}));
router.post('/', (0, auth_1.checkRole)(['store_owner', 'manager']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const { title, slug, content, summary, featuredImage, status, publishedAt } = req.body;
    const storeId = req.storeId;
    if (!title || !slug || !content) {
        throw ApiError_1.ApiError.badRequest('Title, slug, and content are required');
    }
    const post = new BlogPost_1.BlogPost({
        title,
        slug,
        content,
        summary,
        featuredImage,
        status: status || 'DRAFT',
        publishedAt: status === 'PUBLISHED' ? new Date() : (publishedAt || undefined),
        storeId,
    });
    await post.save();
    res.status(201).json({ success: true, data: post });
}));
router.put('/:id', (0, auth_1.checkRole)(['store_owner', 'manager']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const { title, slug, content, summary, featuredImage, status, publishedAt } = req.body;
    const updateFields = {};
    if (title)
        updateFields.title = title;
    if (slug)
        updateFields.slug = slug;
    if (content)
        updateFields.content = content;
    if (summary !== undefined)
        updateFields.summary = summary;
    if (featuredImage !== undefined)
        updateFields.featuredImage = featuredImage;
    if (status) {
        updateFields.status = status;
        if (status === 'PUBLISHED') {
            updateFields.publishedAt = new Date();
        }
        else if (status === 'SCHEDULED' && publishedAt) {
            updateFields.publishedAt = new Date(publishedAt);
        }
    }
    const post = await BlogPost_1.BlogPost.findByIdAndUpdate(req.params.id, updateFields, { new: true }).exec();
    if (!post) {
        throw ApiError_1.ApiError.notFound('Blog post not found');
    }
    res.json({ success: true, data: post });
}));
router.delete('/:id', (0, auth_1.checkRole)(['store_owner', 'manager']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const post = await BlogPost_1.BlogPost.findByIdAndDelete(req.params.id).exec();
    if (!post) {
        throw ApiError_1.ApiError.notFound('Blog post not found');
    }
    res.json({ success: true, message: 'Blog post deleted successfully' });
}));
exports.default = router;
