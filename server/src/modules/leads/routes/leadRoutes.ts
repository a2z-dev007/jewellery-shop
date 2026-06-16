import { Router, Request, Response } from 'express';
import { Lead } from '../models/Lead';
import { checkAuth, checkRole, AuthRequest } from '../../../shared/middleware/auth';
import { ApiError } from '../../../shared/utils/ApiError';
import { asyncErrorWrapper } from '../../../shared/utils/asyncErrorWrapper';

const router = Router();

// Public route: Web contact form lead submission (requires storeId context)
router.post(
  '/submit',
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const { name, email, phone, source } = req.body;
    const storeId = (req as any).storeId;

    if (!storeId) {
      throw ApiError.badRequest('Store context is required');
    }
    if (!name || !email) {
      throw ApiError.badRequest('Name and email are required');
    }

    const lead = new Lead({
      name,
      email,
      phone,
      source: source || 'web_form',
      activities: [
        {
          type: 'note_added',
          content: 'Lead captured automatically from web form submit',
          createdAt: new Date(),
        },
      ],
      storeId,
    });

    await lead.save();
    res.status(201).json({ success: true, data: lead, message: 'Lead submitted successfully' });
  })
);

// Protected routes (Dashboard CRM operations)
router.use(checkAuth);

router.get(
  '/',
  checkRole(['store_owner', 'manager']),
  asyncErrorWrapper(async (req: AuthRequest, res: Response) => {
    const page = parseInt(req.query.page as string || '1', 10);
    const limit = parseInt(req.query.limit as string || '20', 10);
    const status = req.query.status as string;

    const query: any = {};
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Lead.find(query).sort('-createdAt').skip(skip).limit(limit).exec(),
      Lead.countDocuments(query).exec(),
    ]);

    res.json({ success: true, data: { items, total, page, limit } });
  })
);

router.get(
  '/:id',
  checkRole(['store_owner', 'manager']),
  asyncErrorWrapper(async (req: AuthRequest, res: Response) => {
    const lead = await Lead.findById(req.params.id).exec();
    if (!lead) {
      throw ApiError.notFound('Lead not found');
    }
    res.json({ success: true, data: lead });
  })
);

router.put(
  '/:id/status',
  checkRole(['store_owner', 'manager']),
  asyncErrorWrapper(async (req: AuthRequest, res: Response) => {
    const { status } = req.body;
    if (!status) {
      throw ApiError.badRequest('Status is required');
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      throw ApiError.notFound('Lead not found');
    }

    const oldStatus = lead.status;
    lead.status = status;
    lead.activities.push({
      type: 'status_change',
      content: `Status updated from ${oldStatus} to ${status}`,
      performedBy: req.user?.id as any,
      createdAt: new Date(),
    });

    await lead.save();
    res.json({ success: true, data: lead });
  })
);

router.post(
  '/:id/activity',
  checkRole(['store_owner', 'manager']),
  asyncErrorWrapper(async (req: AuthRequest, res: Response) => {
    const { type, content } = req.body;
    if (!type || !content) {
      throw ApiError.badRequest('Activity type and content are required');
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      throw ApiError.notFound('Lead not found');
    }

    lead.activities.push({
      type,
      content,
      performedBy: req.user?.id as any,
      createdAt: new Date(),
    });

    await lead.save();
    res.json({ success: true, data: lead });
  })
);

export default router;
