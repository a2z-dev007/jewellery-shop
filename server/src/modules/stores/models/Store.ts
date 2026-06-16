import { Schema, model, Document } from 'mongoose';

export interface IAttributeSchemaDefinition {
  key: string;
  label: string;
  type: 'string' | 'number' | 'select' | 'boolean';
  required: boolean;
  options?: string[];
}

export interface IStore extends Document {
  name: string;
  slug: string;
  customDomain?: string;
  businessType: 'Jewellery' | 'Fashion' | 'Salon' | 'Gym' | 'Clinic';
  activeModules: string[];
  attributeSchemas: IAttributeSchemaDefinition[];
  settings: {
    currency: string;
    timezone: string;
    taxRate: number;
    workingHours?: {
      [day: string]: { open: string; close: string; active: boolean };
    };
    holidays?: string[]; // Array of ISO Date strings (YYYY-MM-DD)
  };
  createdAt: Date;
  updatedAt: Date;
}

const AttributeSchemaDefinitionSchema = new Schema<IAttributeSchemaDefinition>({
  key: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, enum: ['string', 'number', 'select', 'boolean'], required: true },
  required: { type: Boolean, default: false },
  options: [String],
});

const StoreSchema = new Schema<IStore>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  customDomain: { type: String, unique: true, sparse: true, index: true },
  businessType: {
    type: String,
    enum: ['Jewellery', 'Fashion', 'Salon', 'Gym', 'Clinic'],
    required: true,
  },
  activeModules: { type: [String], default: ['cms'] },
  attributeSchemas: [AttributeSchemaDefinitionSchema],
  settings: {
    currency: { type: String, default: 'USD' },
    timezone: { type: String, default: 'UTC' },
    taxRate: { type: Number, default: 0 },
    workingHours: { type: Map, of: Schema.Types.Mixed as any },
    holidays: [String],
  },
}, { timestamps: true });

export const Store = model<IStore>('Store', StoreSchema);
