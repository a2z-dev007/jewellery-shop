import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, IUser } from '../../users/models/User';
import { Store } from '../../stores/models/Store';
import { config } from '../../../config/unifiedConfig';
import { ApiError } from '../../../shared/utils/ApiError';

export class AuthService {
  async registerStoreAndOwner(data: any) {
    // Check if user email already exists
    const existingUser = await User.findOne({ email: data.email }).exec();
    if (existingUser) {
      throw ApiError.conflict('Email address is already in use');
    }

    // If slug is provided, check if store exists
    if (data.slug) {
      const existingStore = await Store.findOne({ slug: data.slug }).exec();
      if (existingStore) {
        throw ApiError.conflict(`Store slug '${data.slug}' is already taken`);
      }
    }

    // 1. Create the store
    const store = new Store({
      name: data.storeName || `${data.name}'s Store`,
      slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      businessType: data.businessType || 'Jewellery',
      activeModules: ['cms', 'products', 'categories'],
    });
    await store.save();

    // 2. Hash password
    const passwordHash = await bcrypt.hash(data.password, 10);

    // 3. Create the user as store_owner
    const user = new User({
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

  async login(data: any) {
    const user = await User.findOne({ email: data.email }).exec();
    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const tokens = this.generateTokens(user);
    return { user, ...tokens };
  }

  async refreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, config.auth.jwtRefreshSecret) as any;
      const user = await User.findById(decoded.id).exec();
      if (!user) {
        throw ApiError.unauthorized('User not found');
      }

      const tokens = this.generateTokens(user);
      return tokens;
    } catch (error) {
      throw ApiError.unauthorized('Invalid refresh token');
    }
  }

  private generateTokens(user: IUser) {
    const payload = {
      id: user._id,
      role: user.role,
      storeId: user.storeId?.toString(),
    };

    const accessToken = jwt.sign(payload, config.auth.jwtSecret, {
      expiresIn: config.auth.accessTokenExpiry as any,
    });

    const refreshToken = jwt.sign({ id: user._id }, config.auth.jwtRefreshSecret, {
      expiresIn: config.auth.refreshTokenExpiry as any,
    });

    return { accessToken, refreshToken };
  }
}

export const authService = new AuthService();
