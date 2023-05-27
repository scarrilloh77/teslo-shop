import { isValidObjectId } from 'mongoose';
import { db } from '.';
import { Order } from '@/models';
import { IOrder } from '@/interfaces';

export const getOrderById = async (id: string) => {
  if (!isValidObjectId(id)) {
    return null;
  }

  await db.connect();
  const order = await Order.findById(id).lean();
  await db.disconnect();

  if (!order) {
    return null;
  }

  return JSON.parse(JSON.stringify(order));
};
