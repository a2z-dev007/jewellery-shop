import { z } from 'zod';
import { Store } from '../../stores/models/Store';
import { ApiError } from '../../../shared/utils/ApiError';

export async function buildDynamicZodSchema(storeId: string) {
  const store = await Store.findById(storeId).exec();
  if (!store) {
    throw ApiError.notFound('Store context not found for validation');
  }

  const shape: Record<string, z.ZodTypeAny> = {};
  const definitions = store.attributeSchemas || [];

  definitions.forEach((def) => {
    let validator: z.ZodTypeAny;

    switch (def.type) {
      case 'number':
        validator = z.number();
        break;
      case 'boolean':
        validator = z.boolean();
        break;
      case 'select':
        if (def.options && def.options.length > 0) {
          validator = z.enum(def.options as [string, ...string[]]);
        } else {
          validator = z.string();
        }
        break;
      default:
        validator = z.string();
    }

    if (!def.required) {
      validator = validator.optional();
    }

    shape[def.key] = validator;
  });

  return z.object(shape);
}

export async function validateCustomAttributes(storeId: string, customAttributes: any) {
  const schema = await buildDynamicZodSchema(storeId);
  return schema.parse(customAttributes || {});
}
