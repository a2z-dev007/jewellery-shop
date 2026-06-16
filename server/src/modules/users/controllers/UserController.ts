import { Request, Response } from 'express';
import { BaseController } from '../../../shared/utils/BaseController';
import { userService } from '../services/userService';
import { asyncErrorWrapper } from '../../../shared/utils/asyncErrorWrapper';
import { AuthRequest } from '../../../shared/middleware/auth';
import { ApiError } from '../../../shared/utils/ApiError';

export class UserController extends BaseController {
  invite = asyncErrorWrapper(async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { email, role } = req.body;
      const storeId = req.user?.storeId;

      if (!email || !role) {
        throw ApiError.badRequest('Email and role are required');
      }

      if (!storeId) {
        throw ApiError.badRequest('Store ID is missing from user context');
      }

      const result = await userService.inviteUser(email, role, storeId);
      this.handleSuccess(res, result, 'Invitation link generated successfully');
    } catch (error) {
      this.handleError(error, res, 'invite');
    }
  });

  acceptInvite = asyncErrorWrapper(async (req: Request, res: Response): Promise<void> => {
    try {
      const { token, name, password } = req.body;
      if (!token || !name || !password) {
        throw ApiError.badRequest('Token, name, and password are required');
      }

      const user = await userService.acceptInvitation(token, name, password);
      this.handleSuccess(res, { id: user._id, name: user.name, email: user.email, role: user.role }, 'Invitation accepted successfully', 201);
    } catch (error) {
      this.handleError(error, res, 'acceptInvite');
    }
  });

  list = asyncErrorWrapper(async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const storeId = req.user?.storeId;
      if (!storeId) {
        throw ApiError.badRequest('Store ID is missing');
      }

      const staffList = await userService.listStaff(storeId);
      this.handleSuccess(res, staffList);
    } catch (error) {
      this.handleError(error, res, 'list');
    }
  });

  updateRole = asyncErrorWrapper(async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { role } = req.body;
      const storeId = req.user?.storeId;
      if (!storeId) {
        throw ApiError.badRequest('Store ID is missing');
      }

      const user = await userService.updateStaffRole(req.params.id as string, role, storeId);
      this.handleSuccess(res, user, 'Staff role updated successfully');
    } catch (error) {
      this.handleError(error, res, 'updateRole');
    }
  });

  delete = asyncErrorWrapper(async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const storeId = req.user?.storeId;
      if (!storeId) {
        throw ApiError.badRequest('Store ID is missing');
      }

      await userService.removeStaff(req.params.id as string, storeId);
      this.handleSuccess(res, null, 'Staff member removed successfully');
    } catch (error) {
      this.handleError(error, res, 'delete');
    }
  });
}

export const userController = new UserController();
