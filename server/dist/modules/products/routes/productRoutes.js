"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_1 = require("../models/Product");
const auth_1 = require("../../../shared/middleware/auth");
const dynamicValidator_1 = require("../validators/dynamicValidator");
const ApiError_1 = require("../../../shared/utils/ApiError");
const asyncErrorWrapper_1 = require("../../../shared/utils/asyncErrorWrapper");
const router = (0, express_1.Router)();
router.get('/', (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '20', 10);
    const sort = req.query.sort || '-createdAt';
    const categoryId = req.query.categoryId;
    const query = {};
    if (categoryId)
        query.categoryId = categoryId;
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
        Product_1.Product.find(query).sort(sort).skip(skip).limit(limit).populate('categoryId').exec(),
        Product_1.Product.countDocuments(query).exec(),
    ]);
    res.json({
        success: true,
        data: { items, total, page, limit },
    });
}));
router.get('/:id', (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const product = await Product_1.Product.findById(req.params.id).populate('categoryId').exec();
    if (!product) {
        throw ApiError_1.ApiError.notFound('Product not found');
    }
    res.json({ success: true, data: product });
}));
router.post('/', auth_1.checkAuth, (0, auth_1.checkRole)(['store_owner', 'manager']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const { name, slug, sku, price, stock, categoryId, customAttributes } = req.body;
    const storeId = req.storeId;
    if (!name || !slug || !sku || price === undefined || stock === undefined) {
        throw ApiError_1.ApiError.badRequest('Name, slug, sku, price, and stock are required');
    }
    // Validate dynamic custom attributes matching store settings
    let validatedAttributes = {};
    if (customAttributes) {
        validatedAttributes = await (0, dynamicValidator_1.validateCustomAttributes)(storeId, customAttributes);
    }
    const product = new Product_1.Product({
        name,
        slug,
        sku,
        price,
        stock,
        categoryId: categoryId || undefined,
        customAttributes: validatedAttributes,
        storeId,
    });
    await product.save();
    res.status(201).json({ success: true, data: product });
}));
router.put('/:id', auth_1.checkAuth, (0, auth_1.checkRole)(['store_owner', 'manager']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const { name, slug, sku, price, stock, categoryId, customAttributes } = req.body;
    const storeId = req.storeId;
    const updateFields = {};
    if (name)
        updateFields.name = name;
    if (slug)
        updateFields.slug = slug;
    if (sku)
        updateFields.sku = sku;
    if (price !== undefined)
        updateFields.price = price;
    if (stock !== undefined)
        updateFields.stock = stock;
    if (categoryId)
        updateFields.categoryId = categoryId;
    if (customAttributes) {
        updateFields.customAttributes = await (0, dynamicValidator_1.validateCustomAttributes)(storeId, customAttributes);
    }
    const product = await Product_1.Product.findByIdAndUpdate(req.params.id, updateFields, { new: true }).exec();
    if (!product) {
        throw ApiError_1.ApiError.notFound('Product not found');
    }
    res.json({ success: true, data: product });
}));
router.delete('/:id', auth_1.checkAuth, (0, auth_1.checkRole)(['store_owner', 'manager']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const product = await Product_1.Product.findByIdAndDelete(req.params.id).exec();
    if (!product) {
        throw ApiError_1.ApiError.notFound('Product not found');
    }
    res.json({ success: true, message: 'Product deleted successfully' });
}));
exports.default = router;
