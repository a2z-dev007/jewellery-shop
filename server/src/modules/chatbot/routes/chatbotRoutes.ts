import { Router, Request, Response } from 'express';
import { ChatbotConfig } from '../models/ChatbotConfig';
import { checkAuth, checkRole } from '../../../shared/middleware/auth';
import { ApiError } from '../../../shared/utils/ApiError';
import { asyncErrorWrapper } from '../../../shared/utils/asyncErrorWrapper';

const router = Router();

// Public: Get widget settings
router.get(
  '/settings',
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const config = await ChatbotConfig.findOne().exec();
    if (!config) {
      // Return default config if not configured yet
      return res.json({
        success: true,
        data: {
          widgetColor: '#4f46e5',
          welcomeMessage: 'Hello! How can we help you today?',
          faqs: [],
        },
      });
    }
    res.json({ success: true, data: config });
  })
);

// Protected: Update chatbot configuration
router.use(checkAuth);

router.put(
  '/settings',
  checkRole(['store_owner', 'manager']),
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const { widgetColor, welcomeMessage, faqs } = req.body;
    const storeId = (req as any).storeId;

    const config = await ChatbotConfig.findOneAndUpdate(
      {},
      { widgetColor, welcomeMessage, faqs, storeId },
      { new: true, upsert: true }
    ).exec();

    res.json({ success: true, data: config });
  })
);

export default router;
