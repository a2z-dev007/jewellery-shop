import { Request, Response } from 'express';
import { BaseController } from '../../../shared/utils/BaseController';
import { authService } from '../services/authService';
import { asyncErrorWrapper } from '../../../shared/utils/asyncErrorWrapper';
import { signUpSchema, signInSchema } from '../validators/auth.schema';
import { config } from '../../../config/unifiedConfig';

export class AuthController extends BaseController {
  register = asyncErrorWrapper(async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = signUpSchema.parse(req.body);
      const result = await authService.registerStoreAndOwner(validatedData);
      
      this.setCookie(res, result.refreshToken);
      this.handleSuccess(res, {
        user: { id: result.user._id, name: result.user.name, email: result.user.email, role: result.user.role },
        store: result.store,
        accessToken: result.accessToken,
      }, 'Registration successful', 201);
    } catch (error) {
      this.handleError(error, res, 'register');
    }
  });

  login = asyncErrorWrapper(async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = signInSchema.parse(req.body);
      const result = await authService.login(validatedData);
      
      this.setCookie(res, result.refreshToken);
      this.handleSuccess(res, {
        user: { id: result.user._id, name: result.user.name, email: result.user.email, role: result.user.role, storeId: result.user.storeId },
        accessToken: result.accessToken,
      }, 'Login successful');
    } catch (error) {
      this.handleError(error, res, 'login');
    }
  });

  refresh = asyncErrorWrapper(async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.cookies[config.auth.cookieName] || req.body.refreshToken;
      if (!token) {
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Refresh token is missing' } });
        return;
      }

      const result = await authService.refreshToken(token);
      this.setCookie(res, result.refreshToken);
      this.handleSuccess(res, { accessToken: result.accessToken }, 'Token refreshed successfully');
    } catch (error) {
      this.handleError(error, res, 'refresh');
    }
  });

  logout = asyncErrorWrapper(async (req: Request, res: Response): Promise<void> => {
    res.clearCookie(config.auth.cookieName, {
      httpOnly: true,
      secure: config.env === 'production',
      sameSite: 'strict',
    });
    this.handleSuccess(res, null, 'Logged out successfully');
  });

  private setCookie(res: Response, token: string) {
    res.cookie(config.auth.cookieName, token, {
      httpOnly: true,
      secure: config.env === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }
}

export const authController = new AuthController();
