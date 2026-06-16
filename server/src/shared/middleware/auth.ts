import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config/unifiedConfig';
import { ApiError } from '../utils/ApiError';
import { asyncErrorWrapper } from '../utils/asyncErrorWrapper';
import { User } from '../../modules/users/models/User';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: 'super_admin' | 'store_owner' | 'manager' | 'staff';
    storeId?: string;
  };
}

export const checkAuth = asyncErrorWrapper(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(ApiError.unauthorized('Access token is missing'));
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.auth.jwtSecret) as any;
    req.user = {
      id: decoded.id,
      role: decoded.role,
      storeId: decoded.storeId,
    };
    next();
  } catch (error) {
    next(ApiError.unauthorized('Access token is expired or invalid'));
  }
});

export const checkRole = (roles: Array<'super_admin' | 'store_owner' | 'manager' | 'staff'>) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(ApiError.unauthorized());
    }

    if (req.user.role === 'super_admin') {
      return next(); // Super Admin bypasses all checks
    }

    if (!roles.includes(req.user.role)) {
      return next(ApiError.forbidden('You do not have permission to access this resource'));
    }

    next();
  };
};
