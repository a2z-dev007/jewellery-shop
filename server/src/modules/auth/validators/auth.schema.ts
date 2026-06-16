import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  storeName: z.string().min(2, 'Store name must be at least 2 characters').optional(),
  slug: z.string().min(2, 'Store slug must be at least 2 characters').optional(),
  businessType: z.enum(['Jewellery', 'Fashion', 'Salon', 'Gym', 'Clinic']).optional(),
});

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
});
