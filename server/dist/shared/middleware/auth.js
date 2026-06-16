"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const unifiedConfig_1 = require("../../config/unifiedConfig");
const ApiError_1 = require("../utils/ApiError");
const asyncErrorWrapper_1 = require("../utils/asyncErrorWrapper");
exports.checkAuth = (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(ApiError_1.ApiError.unauthorized('Access token is missing'));
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, unifiedConfig_1.config.auth.jwtSecret);
        req.user = {
            id: decoded.id,
            role: decoded.role,
            storeId: decoded.storeId,
        };
        next();
    }
    catch (error) {
        next(ApiError_1.ApiError.unauthorized('Access token is expired or invalid'));
    }
});
const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(ApiError_1.ApiError.unauthorized());
        }
        if (req.user.role === 'super_admin') {
            return next(); // Super Admin bypasses all checks
        }
        if (!roles.includes(req.user.role)) {
            return next(ApiError_1.ApiError.forbidden('You do not have permission to access this resource'));
        }
        next();
    };
};
exports.checkRole = checkRole;
