"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    storeName: zod_1.z.string().min(2, 'Store name must be at least 2 characters').optional(),
    slug: zod_1.z.string().min(2, 'Store slug must be at least 2 characters').optional(),
    businessType: zod_1.z.enum(['Jewellery', 'Fashion', 'Salon', 'Gym', 'Clinic']).optional(),
});
exports.signInSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string(),
});
