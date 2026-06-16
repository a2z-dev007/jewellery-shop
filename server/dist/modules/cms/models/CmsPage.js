"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsPage = void 0;
const mongoose_1 = require("mongoose");
const tenantPlugin_1 = require("../../../shared/database/tenantPlugin");
const CmsPageSchema = new mongoose_1.Schema({
    page: { type: String, required: true },
    sections: { type: [mongoose_1.Schema.Types.Mixed], default: [] },
}, { timestamps: true });
// Page should be unique per store
CmsPageSchema.index({ storeId: 1, page: 1 }, { unique: true });
CmsPageSchema.plugin(tenantPlugin_1.tenantPlugin);
exports.CmsPage = (0, mongoose_1.model)('CmsPage', CmsPageSchema);
