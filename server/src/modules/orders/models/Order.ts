import { Schema, model, Document } from 'mongoose';
import { tenantPlugin } from '../../../shared/database/tenantPlugin';

export interface IOrderItem {
  productId: Schema.Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  items: IOrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentDetails?: {
    gateway: 'stripe' | 'razorpay' | 'mock';
    paymentId?: string;
    orderId?: string;
  };
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  };
  storeId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>({
  items: [OrderItemSchema],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    default: 'PENDING',
    index: true,
  },
  paymentDetails: {
    gateway: { type: String, enum: ['stripe', 'razorpay', 'mock'], required: true },
    paymentId: { type: String },
    orderId: { type: String },
  },
  customerDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
  },
}, { timestamps: true });

OrderSchema.index({ storeId: 1, createdAt: -1 });

OrderSchema.plugin(tenantPlugin);

export const Order = model<IOrder>('Order', OrderSchema);
