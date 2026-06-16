import { Schema, model, Document } from 'mongoose';
import { tenantPlugin } from '../../../shared/database/tenantPlugin';

export interface IFaqItem {
  question: string;
  answer: string;
}

export interface IChatbotConfig extends Document {
  widgetColor: string;
  welcomeMessage: string;
  faqs: IFaqItem[];
  storeId: Schema.Types.ObjectId;
}

const FaqItemSchema = new Schema<IFaqItem>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const ChatbotConfigSchema = new Schema<IChatbotConfig>({
  widgetColor: { type: String, default: '#4f46e5' },
  welcomeMessage: { type: String, default: 'Hello! How can we help you today?' },
  faqs: [FaqItemSchema],
}, { timestamps: true });

ChatbotConfigSchema.plugin(tenantPlugin);

export const ChatbotConfig = model<IChatbotConfig>('ChatbotConfig', ChatbotConfigSchema);
