"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: {
        type: String,
        enum: ['super_admin', 'store_owner', 'manager', 'staff'],
        required: true,
    },
    storeId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Store', index: true },
}, { timestamps: true });
// Compound unique index for multi-tenancy
UserSchema.index({ storeId: 1, email: 1 }, { unique: true });
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt_1.default.compare(password, this.passwordHash);
};
exports.User = (0, mongoose_1.model)('User', UserSchema);
