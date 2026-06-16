"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CmsPage_1 = require("../models/CmsPage");
const auth_1 = require("../../../shared/middleware/auth");
const ApiError_1 = require("../../../shared/utils/ApiError");
const asyncErrorWrapper_1 = require("../../../shared/utils/asyncErrorWrapper");
const router = (0, express_1.Router)();
router.get('/:pageName', (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const page = await CmsPage_1.CmsPage.findOne({ page: req.params.pageName }).exec();
    if (!page) {
        throw ApiError_1.ApiError.notFound(`CMS Page '${req.params.pageName}' not found`);
    }
    res.json({ success: true, data: page });
}));
router.post('/', auth_1.checkAuth, (0, auth_1.checkRole)(['store_owner', 'manager']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const { page, sections } = req.body;
    const storeId = req.storeId;
    if (!page) {
        throw ApiError_1.ApiError.badRequest('Page name is required');
    }
    const newPage = new CmsPage_1.CmsPage({
        page,
        sections: sections || [],
        storeId,
    });
    await newPage.save();
    res.status(201).json({ success: true, data: newPage });
}));
router.put('/:pageName', auth_1.checkAuth, (0, auth_1.checkRole)(['store_owner', 'manager']), (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const { sections } = req.body;
    const page = await CmsPage_1.CmsPage.findOneAndUpdate({ page: req.params.pageName }, { sections }, { new: true, upsert: true } // Create if it doesn't exist
    ).exec();
    res.json({ success: true, data: page });
}));
exports.default = router;
