import { Schema, model, Document } from 'mongoose';
import { tenantPlugin } from '../../../shared/database/tenantPlugin';

export interface ILeadActivity {
  type: 'status_change' | 'note_added' | 'email_sent';
  content: string;
  performedBy?: Schema.Types.ObjectId;
  createdAt: Date;
}

export interface ILead extends Document {
  name: string;
  email: string;
  phone?: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'LOST';
  source?: string;
  activities: ILeadActivity[];
  storeId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const LeadActivitySchema = new Schema<ILeadActivity>({
  type: {
    type: String,
    enum: ['status_change', 'note_added', 'email_sent'],
    required: true,
  },
  content: { type: String, required: true },
  performedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

const LeadSchema = new Schema<ILead>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  status: {
    type: String,
    enum: ['NEW', 'CONTACTED', 'QUALIFIED', 'LOST'],
    default: 'NEW',
    index: true,
  },
  source: { type: String, default: 'web_form' },
  activities: [LeadActivitySchema],
}, { timestamps: true });

LeadSchema.index({ storeId: 1, createdAt: -1 });

LeadSchema.plugin(tenantPlugin);

export const Lead = model<ILead>('Lead', LeadSchema);
