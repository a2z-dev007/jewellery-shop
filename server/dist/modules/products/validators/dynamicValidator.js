"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDynamicZodSchema = buildDynamicZodSchema;
exports.validateCustomAttributes = validateCustomAttributes;
const zod_1 = require("zod");
const Store_1 = require("../../stores/models/Store");
const ApiError_1 = require("../../../shared/utils/ApiError");
async function buildDynamicZodSchema(storeId) {
    const store = await Store_1.Store.findById(storeId).exec();
    if (!store) {
        throw ApiError_1.ApiError.notFound('Store context not found for validation');
    }
    const shape = {};
    const definitions = store.attributeSchemas || [];
    definitions.forEach((def) => {
        let validator;
        switch (def.type) {
            case 'number':
                validator = zod_1.z.number();
                break;
            case 'boolean':
                validator = zod_1.z.boolean();
                break;
            case 'select':
                if (def.options && def.options.length > 0) {
                    validator = zod_1.z.enum(def.options);
                }
                else {
                    validator = zod_1.z.string();
                }
                break;
            default:
                validator = zod_1.z.string();
        }
        if (!def.required) {
            validator = validator.optional();
        }
        shape[def.key] = validator;
    });
    return zod_1.z.object(shape);
}
async function validateCustomAttributes(storeId, customAttributes) {
    const schema = await buildDynamicZodSchema(storeId);
    return schema.parse(customAttributes || {});
}
