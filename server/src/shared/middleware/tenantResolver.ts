import { Request, Response, NextFunction } from 'express';
import { tenantLocalStorage } from '../database/tenantContext';
import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError';
import { logger } from '../utils/logger';

export const tenantResolver = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let storeId: string | undefined;
    const xStoreId = req.headers['x-store-id'] as string;

    if (xStoreId) {
      if (!mongoose.Types.ObjectId.isValid(xStoreId)) {
        return next(ApiError.badRequest('Invalid X-Store-Id format'));
      }
      storeId = xStoreId;
    } else {
      const host = req.headers.host || '';
      const baseDomain = 'commerceos.com';
      
      // Safely access the Store model (it must be registered during server start)
      const Store = mongoose.models.Store || mongoose.model('Store', new mongoose.Schema({
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        customDomain: { type: String },
        businessType: { type: String },
        activeModules: [String],
        settings: { type: mongoose.Schema.Types.Mixed },
      }));

      let store: any = null;

      const hostWithoutPort = host.split(':')[0];

      if (hostWithoutPort.endsWith(baseDomain) && hostWithoutPort !== baseDomain) {
        // e.g. jewellerystore.commerceos.com
        const subdomain = hostWithoutPort.replace(`.${baseDomain}`, '');
        if (subdomain && subdomain !== 'www' && subdomain !== 'api') {
          store = await Store.findOne({ slug: subdomain }).setOptions({ skipTenantCheck: true }).exec();
        }
      } else {
        // Custom domain or local fallback matching slug/domain
        if (hostWithoutPort !== 'localhost' && hostWithoutPort !== '127.0.0.1') {
          store = await Store.findOne({
            $or: [{ customDomain: hostWithoutPort }, { slug: hostWithoutPort }]
          }).setOptions({ skipTenantCheck: true }).exec();
        }
      }

      if (store) {
        storeId = store._id.toString();
      }
    }

    if (!storeId) {
      // Let global/super-admin paths pass without tenant isolation
      return next();
    }

    // Attach to request
    (req as any).storeId = storeId;

    // Run the remaining handlers in the AsyncLocalStorage context
    tenantLocalStorage.run({ storeId }, () => {
      next();
    });
  } catch (error: any) {
    logger.error(`Tenant Resolution Error: ${error.message}`);
    next(ApiError.internal('Failed to resolve tenant context'));
  }
};
