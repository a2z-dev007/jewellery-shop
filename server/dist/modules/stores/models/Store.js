"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const mongoose_1 = require("mongoose");
const AttributeSchemaDefinitionSchema = new mongoose_1.Schema({
    key: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String, enum: ['string', 'number', 'select', 'boolean'], required: true },
    required: { type: Boolean, default: false },
    options: [String],
});
const StoreSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    customDomain: { type: String, unique: true, sparse: true, index: true },
    businessType: {
        type: String,
        enum: ['Jewellery', 'Fashion', 'Salon', 'Gym', 'Clinic'],
        required: true,
    },
    activeModules: { type: [String], default: ['cms'] },
    attributeSchemas: [AttributeSchemaDefinitionSchema],
    settings: {
        currency: { type: String, default: 'USD' },
        timezone: { type: String, default: 'UTC' },
        taxRate: { type: Number, default: 0 },
        workingHours: { type: Map, of: mongoose_1.Schema.Types.Mixed },
        holidays: [String],
    },
}, { timestamps: true });
exports.Store = (0, mongoose_1.model)('Store', StoreSchema);
