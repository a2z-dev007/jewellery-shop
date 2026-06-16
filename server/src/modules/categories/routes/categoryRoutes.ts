import { Router, Request, Response } from 'express';
import { Category } from '../models/Category';
import { checkAuth, checkRole } from '../../../shared/middleware/auth';
import { ApiError } from '../../../shared/utils/ApiError';
import { asyncErrorWrapper } from '../../../shared/utils/asyncErrorWrapper';

const router = Router();

router.get(
  '/',
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const categories = await Category.find().populate('parentId').exec();
    res.json({ success: true, data: categories });
  })
);

router.post(
  '/',
  checkAuth,
  checkRole(['store_owner', 'manager']),
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const { name, slug, parentId } = req.body;
    if (!name || !slug) {
      throw ApiError.badRequest('Name and slug are required');
    }
    
    // Explicitly add storeId since plugin requires it on create
    const storeId = (req as any).storeId;

    const category = new Category({
      name,
      slug,
      parentId: parentId || null,
      storeId,
    });
    await category.save();
    res.status(201).json({ success: true, data: category });
  })
);

router.put(
  '/:id',
  checkAuth,
  checkRole(['store_owner', 'manager']),
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const { name, slug, parentId } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, slug, parentId: parentId || null },
      { new: true }
    ).exec();

    if (!category) {
      throw ApiError.notFound('Category not found');
    }
    res.json({ success: true, data: category });
  })
);

router.delete(
  '/:id',
  checkAuth,
  checkRole(['store_owner', 'manager']),
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const category = await Category.findByIdAndDelete(req.params.id).exec();
    if (!category) {
      throw ApiError.notFound('Category not found');
    }
    res.json({ success: true, message: 'Category deleted successfully' });
  })
);

export default router;
