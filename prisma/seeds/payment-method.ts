import { PrismaClient } from '@prisma/client';

const generatePaymentMethod = async (
  prisma: PrismaClient,
  label: string,
  amount: number,
) => {
  await prisma.paymentMethod.upsert({
    where: { label },
    update: {},
    create: {
      label,
      amount,
    },
  });
};

export const paymentMethodSeed = async (prisma: PrismaClient) => {
  await generatePaymentMethod(prisma, 'クレジットカード', 0);
  await generatePaymentMethod(prisma, '銀行振込', 500);
};
