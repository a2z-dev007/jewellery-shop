"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantPlugin = tenantPlugin;
const mongoose_1 = require("mongoose");
const tenantContext_1 = require("./tenantContext");
function tenantPlugin(schema) {
    // Add storeId field to all tenant-scoped schemas
    schema.add({
        storeId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Store',
            required: true,
            index: true,
        },
    });
    // Intercept find, findOne, update, count, etc.
    const queryHooks = [
        'find',
        'findOne',
        'findOneAndUpdate',
        'updateMany',
        'updateOne',
        'countDocuments',
    ];
    queryHooks.forEach((hook) => {
        schema.pre(hook, function (next) {
            const filter = this.getFilter();
            const options = this.getOptions();
            // Only inject storeId if not explicitly provided and skipTenantCheck is not true
            if (filter.storeId === undefined && options.skipTenantCheck !== true) {
                const storeId = (0, tenantContext_1.getStoreId)();
                if (storeId) {
                    this.where({ storeId });
                }
            }
            next();
        });
    });
}
