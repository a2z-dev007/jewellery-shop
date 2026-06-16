"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserController = void 0;
const BaseController_1 = require("../../../shared/utils/BaseController");
const userService_1 = require("../services/userService");
const asyncErrorWrapper_1 = require("../../../shared/utils/asyncErrorWrapper");
const ApiError_1 = require("../../../shared/utils/ApiError");
class UserController extends BaseController_1.BaseController {
    invite = (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
        try {
            const { email, role } = req.body;
            const storeId = req.user?.storeId;
            if (!email || !role) {
                throw ApiError_1.ApiError.badRequest('Email and role are required');
            }
            if (!storeId) {
                throw ApiError_1.ApiError.badRequest('Store ID is missing from user context');
            }
            const result = await userService_1.userService.inviteUser(email, role, storeId);
            this.handleSuccess(res, result, 'Invitation link generated successfully');
        }
        catch (error) {
            this.handleError(error, res, 'invite');
        }
    });
    acceptInvite = (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
        try {
            const { token, name, password } = req.body;
            if (!token || !name || !password) {
                throw ApiError_1.ApiError.badRequest('Token, name, and password are required');
            }
            const user = await userService_1.userService.acceptInvitation(token, name, password);
            this.handleSuccess(res, { id: user._id, name: user.name, email: user.email, role: user.role }, 'Invitation accepted successfully', 201);
        }
        catch (error) {
            this.handleError(error, res, 'acceptInvite');
        }
    });
    list = (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
        try {
            const storeId = req.user?.storeId;
            if (!storeId) {
                throw ApiError_1.ApiError.badRequest('Store ID is missing');
            }
            const staffList = await userService_1.userService.listStaff(storeId);
            this.handleSuccess(res, staffList);
        }
        catch (error) {
            this.handleError(error, res, 'list');
        }
    });
    updateRole = (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
        try {
            const { role } = req.body;
            const storeId = req.user?.storeId;
            if (!storeId) {
                throw ApiError_1.ApiError.badRequest('Store ID is missing');
            }
            const user = await userService_1.userService.updateStaffRole(req.params.id, role, storeId);
            this.handleSuccess(res, user, 'Staff role updated successfully');
        }
        catch (error) {
            this.handleError(error, res, 'updateRole');
        }
    });
    delete = (0, asyncErrorWrapper_1.asyncErrorWrapper)(async (req, res) => {
        try {
            const storeId = req.user?.storeId;
            if (!storeId) {
                throw ApiError_1.ApiError.badRequest('Store ID is missing');
            }
            await userService_1.userService.removeStaff(req.params.id, storeId);
            this.handleSuccess(res, null, 'Staff member removed successfully');
        }
        catch (error) {
            this.handleError(error, res, 'delete');
        }
    });
}
exports.UserController = UserController;
exports.userController = new UserController();
