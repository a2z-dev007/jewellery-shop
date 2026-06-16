import { Schema, model, Document } from 'mongoose';
import { tenantPlugin } from '../../../shared/database/tenantPlugin';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  content: string;
  summary?: string;
  featuredImage?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED';
  publishedAt?: Date;
  storeId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String },
  featuredImage: { type: String },
  status: {
    type: String,
    enum: ['DRAFT', 'PUBLISHED', 'SCHEDULED'],
    default: 'DRAFT',
  },
  publishedAt: { type: Date },
}, { timestamps: true });

BlogPostSchema.index({ storeId: 1, slug: 1 }, { unique: true });
BlogPostSchema.index({ storeId: 1, status: 1, publishedAt: 1 });

BlogPostSchema.plugin(tenantPlugin);

export const BlogPost = model<IBlogPost>('BlogPost', BlogPostSchema);
