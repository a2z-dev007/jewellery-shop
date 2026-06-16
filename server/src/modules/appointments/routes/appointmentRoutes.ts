import { Router, Request, Response } from 'express';
import { Appointment } from '../models/Appointment';
import { generateAvailableSlots } from '../services/slotsEngine';
import { checkAuth, checkRole, AuthRequest } from '../../../shared/middleware/auth';
import { ApiError } from '../../../shared/utils/ApiError';
import { asyncErrorWrapper } from '../../../shared/utils/asyncErrorWrapper';

const router = Router();

// Public: Get available slots
router.get(
  '/slots',
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const { date, duration } = req.query;
    const storeId = (req as any).storeId;

    if (!storeId) {
      throw ApiError.badRequest('Store context is required');
    }
    if (!date || !duration) {
      throw ApiError.badRequest('Date (YYYY-MM-DD) and duration (minutes) are required');
    }

    const slots = await generateAvailableSlots(storeId, date as string, parseInt(duration as string, 10));
    res.json({ success: true, data: slots });
  })
);

// Public: Book appointment
router.post(
  '/book',
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const { customerName, customerEmail, customerPhone, serviceName, duration, date, time } = req.body;
    const storeId = (req as any).storeId;

    if (!storeId) {
      throw ApiError.badRequest('Store context is required');
    }
    if (!customerName || !customerEmail || !customerPhone || !serviceName || !duration || !date || !time) {
      throw ApiError.badRequest('All fields are required to book an appointment');
    }

    // Parse start and end time
    const [hours, mins] = time.split(':').map(Number);
    const startTime = new Date(date);
    startTime.setHours(hours, mins, 0, 0);

    const endTime = new Date(startTime.getTime() + parseInt(duration, 10) * 60000);

    // double check slot availability
    const slots = await generateAvailableSlots(storeId, date, parseInt(duration, 10));
    if (!slots.includes(time)) {
      throw ApiError.badRequest('The requested time slot is no longer available');
    }

    const appointment = new Appointment({
      customerName,
      customerEmail,
      customerPhone,
      serviceName,
      duration,
      startTime,
      endTime,
      storeId,
    });

    await appointment.save();
    res.status(201).json({ success: true, data: appointment, message: 'Appointment booked successfully' });
  })
);

// Protected: Manage appointments
router.use(checkAuth);

router.get(
  '/',
  checkRole(['store_owner', 'manager', 'staff']),
  asyncErrorWrapper(async (req: AuthRequest, res: Response) => {
    const page = parseInt(req.query.page as string || '1', 10);
    const limit = parseInt(req.query.limit as string || '20', 10);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Appointment.find().sort({ startTime: 1 }).skip(skip).limit(limit).exec(),
      Appointment.countDocuments().exec(),
    ]);

    res.json({ success: true, data: { items, total, page, limit } });
  })
);

router.put(
  '/:id/status',
  checkRole(['store_owner', 'manager', 'staff']),
  asyncErrorWrapper(async (req: AuthRequest, res: Response) => {
    const { status } = req.body;
    if (!status) {
      throw ApiError.badRequest('Status is required');
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).exec();

    if (!appointment) {
      throw ApiError.notFound('Appointment not found');
    }

    res.json({ success: true, data: appointment });
  })
);

export default router;
