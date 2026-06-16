import { Router, Request, Response } from 'express';
import { Customer } from '../models/Customer';
import { checkAuth, checkRole } from '../../../shared/middleware/auth';
import { ApiError } from '../../../shared/utils/ApiError';
import { asyncErrorWrapper } from '../../../shared/utils/asyncErrorWrapper';

const router = Router();

router.use(checkAuth);

router.get(
  '/',
  checkRole(['store_owner', 'manager', 'staff']),
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string || '1', 10);
    const limit = parseInt(req.query.limit as string || '20', 10);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Customer.find().skip(skip).limit(limit).exec(),
      Customer.countDocuments().exec(),
    ]);

    res.json({ success: true, data: { items, total, page, limit } });
  })
);

router.get(
  '/:id',
  checkRole(['store_owner', 'manager', 'staff']),
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const customer = await Customer.findById(req.params.id).exec();
    if (!customer) {
      throw ApiError.notFound('Customer not found');
    }
    res.json({ success: true, data: customer });
  })
);

router.post(
  '/',
  checkRole(['store_owner', 'manager', 'staff']),
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const { name, email, phone } = req.body;
    const storeId = (req as any).storeId;

    if (!name || !email) {
      throw ApiError.badRequest('Name and email are required');
    }

    const customer = new Customer({
      name,
      email,
      phone,
      storeId,
    });
    await customer.save();

    res.status(201).json({ success: true, data: customer });
  })
);

export default router;
