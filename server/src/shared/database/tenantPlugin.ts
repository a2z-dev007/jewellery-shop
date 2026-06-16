import { Schema, Query } from 'mongoose';
import { getStoreId } from './tenantContext';

export function tenantPlugin(schema: Schema) {
  // Add storeId field to all tenant-scoped schemas
  schema.add({
    storeId: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
      index: true,
    },
  });

  // Intercept find, findOne, update, count, etc.
  const queryHooks = [
    'find',
    'findOne',
    'findOneAndUpdate',
    'updateMany',
    'updateOne',
    'countDocuments',
  ];

  queryHooks.forEach((hook) => {
    schema.pre(hook as any, function (this: any, next: any) {
      const filter = this.getFilter();
      const options = this.getOptions();

      // Only inject storeId if not explicitly provided and skipTenantCheck is not true
      if (filter.storeId === undefined && options.skipTenantCheck !== true) {
        const storeId = getStoreId();
        if (storeId) {
          this.where({ storeId });
        }
      }
      next();
    });
  });
}
