import { Schema, model, Document } from 'mongoose';
import { tenantPlugin } from '../../../shared/database/tenantPlugin';

export interface IDailyMetrics extends Document {
  date: string; // format YYYY-MM-DD
  salesTotal: number;
  orderCount: number;
  leadsCaptured: number;
  visits: number;
  storeId: Schema.Types.ObjectId;
}

const DailyMetricsSchema = new Schema<IDailyMetrics>({
  date: { type: String, required: true },
  salesTotal: { type: Number, default: 0 },
  orderCount: { type: Number, default: 0 },
  leadsCaptured: { type: Number, default: 0 },
  visits: { type: Number, default: 0 },
}, { timestamps: true });

DailyMetricsSchema.index({ storeId: 1, date: 1 }, { unique: true });

DailyMetricsSchema.plugin(tenantPlugin);

export const DailyMetrics = model<IDailyMetrics>('DailyMetrics', DailyMetricsSchema);
