import { Schema, model, Document } from 'mongoose';
import { tenantPlugin } from '../../../shared/database/tenantPlugin';

export interface IAppointment extends Document {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  duration: number; // in minutes
  startTime: Date;
  endTime: Date;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  staffId?: Schema.Types.ObjectId;
  storeId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    serviceName: { type: String, required: true },
    duration: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'],
      default: 'PENDING',
      index: true,
    },
    staffId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

AppointmentSchema.index({ storeId: 1, startTime: 1 });
AppointmentSchema.index({ storeId: 1, staffId: 1, startTime: 1 });

AppointmentSchema.plugin(tenantPlugin);

export const Appointment = model<IAppointment>('Appointment', AppointmentSchema);
