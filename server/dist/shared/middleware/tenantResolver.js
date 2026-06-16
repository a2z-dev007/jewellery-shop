"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantResolver = void 0;
const tenantContext_1 = require("../database/tenantContext");
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = require("../utils/ApiError");
const logger_1 = require("../utils/logger");
const tenantResolver = async (req, res, next) => {
    try {
        let storeId;
        const xStoreId = req.headers['x-store-id'];
        if (xStoreId) {
            if (!mongoose_1.default.Types.ObjectId.isValid(xStoreId)) {
                return next(ApiError_1.ApiError.badRequest('Invalid X-Store-Id format'));
            }
            storeId = xStoreId;
        }
        else {
            const host = req.headers.host || '';
            const baseDomain = 'commerceos.com';
            // Safely access the Store model (it must be registered during server start)
            const Store = mongoose_1.default.models.Store || mongoose_1.default.model('Store', new mongoose_1.default.Schema({
                name: { type: String, required: true },
                slug: { type: String, required: true, unique: true },
                customDomain: { type: String },
                businessType: { type: String },
                activeModules: [String],
                settings: { type: mongoose_1.default.Schema.Types.Mixed },
            }));
            let store = null;
            const hostWithoutPort = host.split(':')[0];
            if (hostWithoutPort.endsWith(baseDomain) && hostWithoutPort !== baseDomain) {
                // e.g. jewellerystore.commerceos.com
                const subdomain = hostWithoutPort.replace(`.${baseDomain}`, '');
                if (subdomain && subdomain !== 'www' && subdomain !== 'api') {
                    store = await Store.findOne({ slug: subdomain }).setOptions({ skipTenantCheck: true }).exec();
                }
            }
            else {
                // Custom domain or local fallback matching slug/domain
                if (hostWithoutPort !== 'localhost' && hostWithoutPort !== '127.0.0.1') {
                    store = await Store.findOne({
                        $or: [{ customDomain: hostWithoutPort }, { slug: hostWithoutPort }]
                    }).setOptions({ skipTenantCheck: true }).exec();
                }
            }
            if (store) {
                storeId = store._id.toString();
            }
        }
        if (!storeId) {
            // Let global/super-admin paths pass without tenant isolation
            return next();
        }
        // Attach to request
        req.storeId = storeId;
        // Run the remaining handlers in the AsyncLocalStorage context
        tenantContext_1.tenantLocalStorage.run({ storeId }, () => {
            next();
        });
    }
    catch (error) {
        logger_1.logger.error(`Tenant Resolution Error: ${error.message}`);
        next(ApiError_1.ApiError.internal('Failed to resolve tenant context'));
    }
};
exports.tenantResolver = tenantResolver;
