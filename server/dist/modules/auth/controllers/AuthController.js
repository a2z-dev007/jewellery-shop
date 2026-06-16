"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const BaseController_1 = require("../../../shared/utils/BaseController");
const authService_1 = require("../services/authService");
const asyncErrorWrapper_1 = require("../../../shared/utils/asyncErrorWrapper");
const auth_schema_1 = require("../validators/auth.schema");
const unifiedConfig_1 = require("../../../config/unifiedConfig");
class AuthController extends BaseController_1.BaseController {
    register = (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
        try {
            const validatedData = auth_schema_1.signUpSchema.parse(req.body);
            const result = await authService_1.authService.registerStoreAndOwner(validatedData);
            this.setCookie(res, result.refreshToken);
            this.handleSuccess(res, {
                user: { id: result.user._id, name: result.user.name, email: result.user.email, role: result.user.role },
                store: result.store,
                accessToken: result.accessToken,
            }, 'Registration successful', 201);
        }
        catch (error) {
            this.handleError(error, res, 'register');
        }
    });
    login = (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
        try {
            const validatedData = auth_schema_1.signInSchema.parse(req.body);
            const result = await authService_1.authService.login(validatedData);
            this.setCookie(res, result.refreshToken);
            this.handleSuccess(res, {
                user: { id: result.user._id, name: result.user.name, email: result.user.email, role: result.user.role, storeId: result.user.storeId },
                accessToken: result.accessToken,
            }, 'Login successful');
        }
        catch (error) {
            this.handleError(error, res, 'login');
        }
    });
    refresh = (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
        try {
            const token = req.cookies[unifiedConfig_1.config.auth.cookieName] || req.body.refreshToken;
            if (!token) {
                res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Refresh token is missing' } });
                return;
            }
            const result = await authService_1.authService.refreshToken(token);
            this.setCookie(res, result.refreshToken);
            this.handleSuccess(res, { accessToken: result.accessToken }, 'Token refreshed successfully');
        }
        catch (error) {
            this.handleError(error, res, 'refresh');
        }
    });
    logout = (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
        res.clearCookie(unifiedConfig_1.config.auth.cookieName, {
            httpOnly: true,
            secure: unifiedConfig_1.config.env === 'production',
            sameSite: 'strict',
        });
        this.handleSuccess(res, null, 'Logged out successfully');
    });
    setCookie(res, token) {
        res.cookie(unifiedConfig_1.config.auth.cookieName, token, {
            httpOnly: true,
            secure: unifiedConfig_1.config.env === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
