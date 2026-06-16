"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Category_1 = require("../models/Category");
const auth_1 = require("../../../shared/middleware/auth");
const ApiError_1 = require("../../../shared/utils/ApiError");
const asyncErrorWrapper_1 = require("../../../shared/utils/asyncErrorWrapper");
const router = (0, express_1.Router)();
router.get('/', (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const categories = await Category_1.Category.find().populate('parentId').exec();
    res.json({ success: true, data: categories });
}));
router.post('/', auth_1.checkAuth, (0, auth_1.checkRole)(['store_owner', 'manager']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const { name, slug, parentId } = req.body;
    if (!name || !slug) {
        throw ApiError_1.ApiError.badRequest('Name and slug are required');
    }
    // Explicitly add storeId since plugin requires it on create
    const storeId = req.storeId;
    const category = new Category_1.Category({
        name,
        slug,
        parentId: parentId || null,
        storeId,
    });
    await category.save();
    res.status(201).json({ success: true, data: category });
}));
router.put('/:id', auth_1.checkAuth, (0, auth_1.checkRole)(['store_owner', 'manager']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const { name, slug, parentId } = req.body;
    const category = await Category_1.Category.findByIdAndUpdate(req.params.id, { name, slug, parentId: parentId || null }, { new: true }).exec();
    if (!category) {
        throw ApiError_1.ApiError.notFound('Category not found');
    }
    res.json({ success: true, data: category });
}));
router.delete('/:id', auth_1.checkAuth, (0, auth_1.checkRole)(['store_owner', 'manager']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const category = await Category_1.Category.findByIdAndDelete(req.params.id).exec();
    if (!category) {
        throw ApiError_1.ApiError.notFound('Category not found');
    }
    res.json({ success: true, message: 'Category deleted successfully' });
}));
exports.default = router;
