import { Router, Request, Response } from 'express';
import { Product } from '../models/Product';
import { checkAuth, checkRole } from '../../../shared/middleware/auth';
import { validateCustomAttributes } from '../validators/dynamicValidator';
import { ApiError } from '../../../shared/utils/ApiError';
import { asyncErrorWrapper } from '../../../shared/utils/asyncErrorWrapper';

const router = Router();

router.get(
  '/',
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string || '1', 10);
    const limit = parseInt(req.query.limit as string || '20', 10);
    const sort = req.query.sort as string || '-createdAt';
    const categoryId = req.query.categoryId as string;

    const query: any = {};
    if (categoryId) query.categoryId = categoryId;

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Product.find(query).sort(sort).skip(skip).limit(limit).populate('categoryId').exec(),
      Product.countDocuments(query).exec(),
    ]);

    res.json({
      success: true,
      data: { items, total, page, limit },
    });
  })
);

router.get(
  '/:id',
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id).populate('categoryId').exec();
    if (!product) {
      throw ApiError.notFound('Product not found');
    }
    res.json({ success: true, data: product });
  })
);

router.post(
  '/',
  checkAuth,
  checkRole(['store_owner', 'manager']),
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const { name, slug, sku, price, stock, categoryId, customAttributes } = req.body;
    const storeId = (req as any).storeId;

    if (!name || !slug || !sku || price === undefined || stock === undefined) {
      throw ApiError.badRequest('Name, slug, sku, price, and stock are required');
    }

    // Validate dynamic custom attributes matching store settings
    let validatedAttributes = {};
    if (customAttributes) {
      validatedAttributes = await validateCustomAttributes(storeId, customAttributes);
    }

    const product = new Product({
      name,
      slug,
      sku,
      price,
      stock,
      categoryId: categoryId || undefined,
      customAttributes: validatedAttributes,
      storeId,
    });

    await product.save();
    res.status(201).json({ success: true, data: product });
  })
);

router.put(
  '/:id',
  checkAuth,
  checkRole(['store_owner', 'manager']),
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const { name, slug, sku, price, stock, categoryId, customAttributes } = req.body;
    const storeId = (req as any).storeId;

    const updateFields: any = {};
    if (name) updateFields.name = name;
    if (slug) updateFields.slug = slug;
    if (sku) updateFields.sku = sku;
    if (price !== undefined) updateFields.price = price;
    if (stock !== undefined) updateFields.stock = stock;
    if (categoryId) updateFields.categoryId = categoryId;

    if (customAttributes) {
      updateFields.customAttributes = await validateCustomAttributes(storeId, customAttributes);
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateFields, { new: true }).exec();
    if (!product) {
      throw ApiError.notFound('Product not found');
    }

    res.json({ success: true, data: product });
  })
);

router.delete(
  '/:id',
  checkAuth,
  checkRole(['store_owner', 'manager']),
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const product = await Product.findByIdAndDelete(req.params.id).exec();
    if (!product) {
      throw ApiError.notFound('Product not found');
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  })
);

export default router;
