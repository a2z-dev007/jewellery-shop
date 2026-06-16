import { Schema, model, Document } from 'mongoose';
import { tenantPlugin } from '../../../shared/database/tenantPlugin';

export interface ICustomer extends Document {
  name: string;
  email: string;
  phone?: string;
  loyaltyPoints: number;
  storeId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema = new Schema<ICustomer>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  loyaltyPoints: { type: Number, default: 0 },
}, { timestamps: true });

// Email unique per store
CustomerSchema.index({ storeId: 1, email: 1 }, { unique: true });

CustomerSchema.plugin(tenantPlugin);

export const Customer = model<ICustomer>('Customer', CustomerSchema);
