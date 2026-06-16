import { Router, Request, Response } from 'express';
import { Order } from '../models/Order';
import { Product } from '../../products/models/Product';
import { orderStateMachine } from '../services/orderStateMachine';
import { checkAuth, checkRole, AuthRequest } from '../../../shared/middleware/auth';
import { ApiError } from '../../../shared/utils/ApiError';
import { asyncErrorWrapper } from '../../../shared/utils/asyncErrorWrapper';

const router = Router();

// Public: Checkout order
router.post(
  '/checkout',
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const { items, customerDetails, gateway } = req.body;
    const storeId = (req as any).storeId;

    if (!storeId) {
      throw ApiError.badRequest('Store context is required');
    }
    if (!items || !items.length || !customerDetails) {
      throw ApiError.badRequest('Items and customerDetails are required');
    }

    // 1. Calculate price and check stock
    let totalAmount = 0;
    const orderItems: any[] = [];

    for (const entry of items) {
      const product = await Product.findById(entry.productId).exec();
      if (!product) {
        throw ApiError.notFound(`Product with ID ${entry.productId} not found`);
      }
      if (product.stock < entry.quantity) {
        throw new ApiError(400, 'INSUFFICIENT_STOCK', `Insufficient stock for product: ${product.name}`);
      }

      const itemCost = product.price * entry.quantity;
      totalAmount += itemCost;

      orderItems.push({
        productId: product._id,
        name: product.name,
        quantity: entry.quantity,
        price: product.price,
      });
    }

    // 2. Save Pending Order
    const order = new Order({
      items: orderItems,
      totalAmount,
      status: 'PENDING',
      paymentDetails: {
        gateway: gateway || 'mock',
      },
      customerDetails,
      storeId,
    });

    await order.save();

    // 3. In production, communicate with Stripe / Razorpay to return client secrets.
    // For mock/development, we'll return a simulated checkout response.
    res.status(201).json({
      success: true,
      data: {
        orderId: order._id,
        totalAmount: order.totalAmount,
        status: order.status,
        clientSecret: 'mock_stripe_client_secret_xyz',
      },
    });
  })
);

// Public mock endpoint to complete payment (simulating Stripe / Razorpay webhooks or client completions)
router.post(
  '/:id/mock-pay',
  asyncErrorWrapper(async (req: Request, res: Response) => {
    const order = await orderStateMachine.transitionToPaid(req.params.id as string);
    res.json({ success: true, data: order, message: 'Mock payment completed successfully' });
  })
);

// Protected order management
router.use(checkAuth);

router.get(
  '/',
  checkRole(['store_owner', 'manager', 'staff']),
  asyncErrorWrapper(async (req: AuthRequest, res: Response) => {
    const page = parseInt(req.query.page as string || '1', 10);
    const limit = parseInt(req.query.limit as string || '20', 10);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Order.find().sort('-createdAt').skip(skip).limit(limit).exec(),
      Order.countDocuments().exec(),
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

    const order = await orderStateMachine.transitionStatus(req.params.id as string, status);
    res.json({ success: true, data: order, message: `Order status updated to ${status}` });
  })
);

export default router;
