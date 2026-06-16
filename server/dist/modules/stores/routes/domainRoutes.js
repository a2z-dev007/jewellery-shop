"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Store_1 = require("../models/Store");
const asyncErrorWrapper_1 = require("../../../shared/utils/asyncErrorWrapper");
const router = (0, express_1.Router)();
// Endpoint for Caddyask verify-domain
router.get('/verify-domain', (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
    const domain = req.query.domain;
    if (!domain) {
        res.status(400).send('Domain query parameter required');
        return;
    }
    // Lookup store by customDomain or slug
    const store = await Store_1.Store.findOne({
        $or: [{ customDomain: domain }, { slug: domain }],
    }).exec();
    if (!store) {
        res.status(404).send('Domain not mapped');
        return;
    }
    res.status(200).send('OK');
}));
exports.default = router;
