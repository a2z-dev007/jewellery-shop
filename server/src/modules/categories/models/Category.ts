import { Schema, model, Document } from 'mongoose';
import { tenantPlugin } from '../../../shared/database/tenantPlugin';

export interface ICategory extends Document {
  name: string;
  slug: string;
  parentId?: Schema.Types.ObjectId | null;
  storeId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  parentId: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
}, { timestamps: true });

// Ensure unique category slug per tenant
CategorySchema.index({ storeId: 1, slug: 1 }, { unique: true });
CategorySchema.index({ storeId: 1, parentId: 1 });

// Apply tenant isolation plugin
CategorySchema.plugin(tenantPlugin);

export const Category = model<ICategory>('Category', CategorySchema);
