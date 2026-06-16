import { Schema, model, Document } from 'mongoose';
import { tenantPlugin } from '../../../shared/database/tenantPlugin';

export interface ICmsPage extends Document {
  page: string; // e.g., 'home', 'about'
  sections: Array<{
    type: string;
    heading?: string;
    subtitle?: string;
    backgroundImage?: string;
    [key: string]: any; // Dynamic parameters
  }>;
  storeId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CmsPageSchema = new Schema<ICmsPage>({
  page: { type: String, required: true },
  sections: { type: [Schema.Types.Mixed as any], default: [] },
}, { timestamps: true });

// Page should be unique per store
CmsPageSchema.index({ storeId: 1, page: 1 }, { unique: true });

CmsPageSchema.plugin(tenantPlugin);

export const CmsPage = model<ICmsPage>('CmsPage', CmsPageSchema);
