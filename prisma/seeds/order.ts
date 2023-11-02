import { PrismaClient } from '@prisma/client';
import { LEAD_TIME } from '../constants';

const generateOrder = async (
  prisma: PrismaClient,
  orderUniqueId: string,
  userId: number,
  username: string,
  furnitureItemId: number,
  quantity: number,
) => {
  await prisma.order.upsert({
    where: { orderUniqueId },
    update: {},
    create: {
      orderUniqueId,
      userId,
      shippingFeeAmount: 0,
      paymentMethodLabel: 'クレジットカード',
      paymentMethodAmount: 0,
      leadTimeLabel: LEAD_TIME.FIVE_DAYS.LABEL,
      leadTimeValue: LEAD_TIME.FIVE_DAYS.VALUE,
      saleTaxRate: 8,
      totalAmount: 1000,
      address: {
        create: {
          name: username,
          nameKana: username,
          email: `${username}@prisma.io`,
          phoneNo: '09012345678',
          zipCode: '100-0005',
          prefectures: '東京都',
          address: '千代田区丸の内１丁目 東京駅',
        },
      },
      items: {
        create: [
          {
            furnitureItemId,
            quantity,
          },
        ],
      },
    },
  });
};

export const orderSeed = async (prisma: PrismaClient) => {
  await generateOrder(prisma, 'ORDER_000001', 1, 'alice', 1, 1);
  await generateOrder(prisma, 'ORDER_000002', 1, 'alice', 2, 1);
  await generateOrder(prisma, 'ORDER_000003', 2, 'john', 3, 1);
  await generateOrder(prisma, 'ORDER_000004', 3, 'maria', 4, 1);
};
