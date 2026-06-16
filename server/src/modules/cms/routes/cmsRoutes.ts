import { Router, Request, Response } from 'express';
import { CmsPage } from '../models/CmsPage';
import { checkAuth, checkRole } from '../../../shared/middleware/auth';
import { ApiError } from '../../../shared/utils/ApiError';
import { asyncErrorWrapper } from '../../../shared/utils/asyncErrorWrapper';

const router = Router();

router.get(
  '/:pageName',
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const page = await CmsPage.findOne({ page: req.params.pageName }).exec();
    if (!page) {
      throw ApiError.notFound(`CMS Page '${req.params.pageName}' not found`);
    }
    res.json({ success: true, data: page });
  })
);

router.post(
  '/',
  checkAuth,
  checkRole(['store_owner', 'manager']),
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const { page, sections } = req.body;
    const storeId = (req as any).storeId;

    if (!page) {
      throw ApiError.badRequest('Page name is required');
    }

    const newPage = new CmsPage({
      page,
      sections: sections || [],
      storeId,
    });

    await newPage.save();
    res.status(201).json({ success: true, data: newPage });
  })
);

router.put(
  '/:pageName',
  checkAuth,
  checkRole(['store_owner', 'manager']),
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const { sections } = req.body;
    const page = await CmsPage.findOneAndUpdate(
      { page: req.params.pageName },
      { sections },
      { new: true, upsert: true } // Create if it doesn't exist
    ).exec();

    res.json({ success: true, data: page });
  })
);

export default router;
