import { Schema, model, Document } from 'mongoose';
import { tenantPlugin } from '../../../shared/database/tenantPlugin';

export interface IProduct extends Document {
  name: string;
  slug: string;
  sku: string;
  price: number;
  stock: number;
  categoryId?: Schema.Types.ObjectId;
  customAttributes: Map<string, any>;
  storeId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  sku: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  customAttributes: { type: Map, of: Schema.Types.Mixed, default: {} },
}, { timestamps: true });

// SKU and Slug must be unique within store
ProductSchema.index({ storeId: 1, sku: 1 }, { unique: true });
ProductSchema.index({ storeId: 1, slug: 1 }, { unique: true });
ProductSchema.index({ storeId: 1, createdAt: -1 });

// Apply tenant isolation plugin
ProductSchema.plugin(tenantPlugin);

export const Product = model<IProduct>('Product', ProductSchema);
