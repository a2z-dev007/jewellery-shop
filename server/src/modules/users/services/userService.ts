import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, IUser } from '../models/User';
import { config } from '../../../config/unifiedConfig';
import { ApiError } from '../../../shared/utils/ApiError';

export class UserService {
  async inviteUser(email: string, role: string, storeId: string) {
    // Check if user already exists
    const existing = await User.findOne({ email, storeId } as any).exec();
    if (existing) {
      throw ApiError.conflict('User with this email is already a member of this store');
    }

    // Generate an invitation token containing email, role, and storeId
    const inviteToken = jwt.sign(
      { email, role, storeId, type: 'invitation' },
      config.auth.jwtSecret,
      { expiresIn: '24h' }
    );

    // In production, send this via email. We'll return it so it can be handled.
    return {
      inviteToken,
      inviteUrl: `/accept-invite?token=${inviteToken}`,
    };
  }

  async acceptInvitation(token: string, name: string, password: string) {
    try {
      const decoded = jwt.verify(token, config.auth.jwtSecret) as any;
      if (decoded.type !== 'invitation') {
        throw ApiError.badRequest('Invalid invitation token');
      }

      const existing = await User.findOne({ email: decoded.email, storeId: decoded.storeId } as any).exec();
      if (existing) {
        throw ApiError.conflict('User is already registered');
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email: decoded.email,
        passwordHash,
        role: decoded.role,
        storeId: decoded.storeId,
      });

      return await user.save();
    } catch (error: any) {
      if (error instanceof ApiError) throw error;
      throw ApiError.badRequest('Invitation token has expired or is invalid');
    }
  }

  async listStaff(storeId: string): Promise<IUser[]> {
    return await User.find({ storeId } as any).select('-passwordHash').exec();
  }

  async updateStaffRole(userId: string, role: 'store_owner' | 'manager' | 'staff', storeId: string): Promise<IUser> {
    const user = await User.findOneAndUpdate(
      { _id: userId, storeId } as any,
      { role },
      { new: true }
    ).select('-passwordHash').exec() as any;

    if (!user) {
      throw ApiError.notFound('Staff user not found in this store');
    }
    return user;
  }

  async removeStaff(userId: string, storeId: string): Promise<void> {
    const result = await User.deleteOne({ _id: userId, storeId } as any).exec();
    if (result.deletedCount === 0) {
      throw ApiError.notFound('Staff user not found in this store');
    }
  }
}

export const userService = new UserService();
