"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const unifiedConfig_1 = require("../../../config/unifiedConfig");
const ApiError_1 = require("../../../shared/utils/ApiError");
class UserService {
    async inviteUser(email, role, storeId) {
        // Check if user already exists
        const existing = await User_1.User.findOne({ email, storeId }).exec();
        if (existing) {
            throw ApiError_1.ApiError.conflict('User with this email is already a member of this store');
        }
        // Generate an invitation token containing email, role, and storeId
        const inviteToken = jsonwebtoken_1.default.sign({ email, role, storeId, type: 'invitation' }, unifiedConfig_1.config.auth.jwtSecret, { expiresIn: '24h' });
        // In production, send this via email. We'll return it so it can be handled.
        return {
            inviteToken,
            inviteUrl: `/accept-invite?token=${inviteToken}`,
        };
    }
    async acceptInvitation(token, name, password) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, unifiedConfig_1.config.auth.jwtSecret);
            if (decoded.type !== 'invitation') {
                throw ApiError_1.ApiError.badRequest('Invalid invitation token');
            }
            const existing = await User_1.User.findOne({ email: decoded.email, storeId: decoded.storeId }).exec();
            if (existing) {
                throw ApiError_1.ApiError.conflict('User is already registered');
            }
            const passwordHash = await bcrypt_1.default.hash(password, 10);
            const user = new User_1.User({
                name,
                email: decoded.email,
                passwordHash,
                role: decoded.role,
                storeId: decoded.storeId,
            });
            return await user.save();
        }
        catch (error) {
            if (error instanceof ApiError_1.ApiError)
                throw error;
            throw ApiError_1.ApiError.badRequest('Invitation token has expired or is invalid');
        }
    }
    async listStaff(storeId) {
        return await User_1.User.find({ storeId }).select('-passwordHash').exec();
    }
    async updateStaffRole(userId, role, storeId) {
        const user = await User_1.User.findOneAndUpdate({ _id: userId, storeId }, { role }, { new: true }).select('-passwordHash').exec();
        if (!user) {
            throw ApiError_1.ApiError.notFound('Staff user not found in this store');
        }
        return user;
    }
    async removeStaff(userId, storeId) {
        const result = await User_1.User.deleteOne({ _id: userId, storeId }).exec();
        if (result.deletedCount === 0) {
            throw ApiError_1.ApiError.notFound('Staff user not found in this store');
        }
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
