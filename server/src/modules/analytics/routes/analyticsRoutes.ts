import { Router, Request, Response } from 'express';
import { DailyMetrics } from '../models/DailyMetrics';
import { checkAuth, checkRole } from '../../../shared/middleware/auth';
import { asyncErrorWrapper } from '../../../shared/utils/asyncErrorWrapper';

const router = Router();

router.use(checkAuth);

router.get(
  '/dashboard',
  checkRole(['store_owner', 'manager']),
  asyncErrorWrapper(async (req: Request, res: Response) => {
    // Get last 30 days of metrics
    const metrics = await DailyMetrics.find()
      .sort({ date: -1 })
      .limit(30)
      .exec();

    res.json({ success: true, data: metrics });
  })
);

export default router;
