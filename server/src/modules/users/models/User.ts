import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'super_admin' | 'store_owner' | 'manager' | 'staff';
  storeId?: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ['super_admin', 'store_owner', 'manager', 'staff'],
    required: true,
  },
  storeId: { type: Schema.Types.ObjectId, ref: 'Store', index: true },
}, { timestamps: true });

// Compound unique index for multi-tenancy
UserSchema.index({ storeId: 1, email: 1 }, { unique: true });

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.passwordHash);
};

export const User = model<IUser>('User', UserSchema);
