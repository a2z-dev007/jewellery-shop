"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../../users/models/User");
const Store_1 = require("../../stores/models/Store");
const unifiedConfig_1 = require("../../../config/unifiedConfig");
const ApiError_1 = require("../../../shared/utils/ApiError");
class AuthService {
    async registerStoreAndOwner(data) {
        // Check if user email already exists
        const existingUser = await User_1.User.findOne({ email: data.email }).exec();
        if (existingUser) {
            throw ApiError_1.ApiError.conflict('Email address is already in use');
        }
        // If slug is provided, check if store exists
        if (data.slug) {
            const existingStore = await Store_1.Store.findOne({ slug: data.slug }).exec();
            if (existingStore) {
                throw ApiError_1.ApiError.conflict(`Store slug '${data.slug}' is already taken`);
            }
        }
        // 1. Create the store
        const store = new Store_1.Store({
            name: data.storeName || `${data.name}'s Store`,
            slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            businessType: data.businessType || 'Jewellery',
            activeModules: ['cms', 'products', 'categories'],
        });
        await store.save();
        // 2. Hash password
        const passwordHash = await bcrypt_1.default.hash(data.password, 10);
        // 3. Create the user as store_owner
        const user = new User_1.User({
            name: data.name,
            email: data.email,
            passwordHash,
            role: 'store_owner',
            storeId: store._id,
        });
        await user.save();
        const tokens = this.generateTokens(user);
        return { user, store, ...tokens };
    }
    async login(data) {
        const user = await User_1.User.findOne({ email: data.email }).exec();
        if (!user) {
            throw ApiError_1.ApiError.unauthorized('Invalid email or password');
        }
        const isMatch = await user.comparePassword(data.password);
        if (!isMatch) {
            throw ApiError_1.ApiError.unauthorized('Invalid email or password');
        }
        const tokens = this.generateTokens(user);
        return { user, ...tokens };
    }
    async refreshToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, unifiedConfig_1.config.auth.jwtRefreshSecret);
            const user = await User_1.User.findById(decoded.id).exec();
            if (!user) {
                throw ApiError_1.ApiError.unauthorized('User not found');
            }
            const tokens = this.generateTokens(user);
            return tokens;
        }
        catch (error) {
            throw ApiError_1.ApiError.unauthorized('Invalid refresh token');
        }
    }
    generateTokens(user) {
        const payload = {
            id: user._id,
            role: user.role,
            storeId: user.storeId?.toString(),
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, unifiedConfig_1.config.auth.jwtSecret, {
            expiresIn: unifiedConfig_1.config.auth.accessTokenExpiry,
        });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, unifiedConfig_1.config.auth.jwtRefreshSecret, {
            expiresIn: unifiedConfig_1.config.auth.refreshTokenExpiry,
        });
        return { accessToken, refreshToken };
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
