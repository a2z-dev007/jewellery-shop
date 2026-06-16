import { Order, IOrder } from '../models/Order';
import { Product } from '../../products/models/Product';
import { Customer } from '../../customers/models/Customer';
import { ApiError } from '../../../shared/utils/ApiError';
import { logger } from '../../../shared/utils/logger';

export class OrderStateMachine {
  async transitionToPaid(orderId: string): Promise<IOrder> {
    const order = await Order.findById(orderId).exec();
    if (!order) {
      throw ApiError.notFound('Order not found');
    }

    if (order.status !== 'PENDING') {
      throw ApiError.badRequest(`Order status is already ${order.status}`);
    }

    // 1. Validate stock inventory and decrement it
    for (const item of order.items) {
      const product = await Product.findById(item.productId).exec();
      if (!product || product.stock < item.quantity) {
        throw new ApiError(400, 'INSUFFICIENT_STOCK', `Insufficient stock for product: ${item.name || product?.name}`);
      }
      product.stock -= item.quantity;
      await product.save();
    }

    // 2. Set order status to PAID
    order.status = 'PAID';
    await order.save();

    // 3. Upsert customer profile
    try {
      await Customer.findOneAndUpdate(
        { email: order.customerDetails.email, storeId: order.storeId },
        {
          $set: {
            name: order.customerDetails.name,
            phone: order.customerDetails.phone,
          },
          $inc: { loyaltyPoints: Math.floor(order.totalAmount * 0.1) }, // 10% cash back in points
        },
        { upsert: true, new: true }
      ).setOptions({ skipTenantCheck: true }).exec(); // Run globally outside scope boundaries if needed, or inside
    } catch (e: any) {
      logger.error(`Failed to upsert customer during order paid state transition: ${e.message}`);
    }

    logger.info(`Order ${orderId} successfully transitioned to PAID. Stock updated and customer logged.`);
    return order;
  }

  async transitionStatus(orderId: string, status: 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'): Promise<IOrder> {
    const order = await Order.findById(orderId).exec();
    if (!order) {
      throw ApiError.notFound('Order not found');
    }

    // Cancellation logic (re-add inventory stock)
    if (status === 'CANCELLED' && order.status !== 'CANCELLED') {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: item.quantity },
        }).exec();
      }
    }

    order.status = status;
    await order.save();
    return order;
  }
}

export const orderStateMachine = new OrderStateMachine();
