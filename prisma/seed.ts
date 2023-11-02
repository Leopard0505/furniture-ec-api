import { PrismaClient } from '@prisma/client';
import { userSeed } from './seeds/user';
import { leadTimeSeed } from './seeds/lead-time';
import { brandCategorySeed } from './seeds/brand-category';
import { furnitureCategorySeed } from './seeds/furniture-category';
import { furnitureSeed } from './seeds/furniture';
import { favoriteSeed } from './seeds/favorite';
import { cartSeed } from './seeds/cart';
import { paymentMethodSeed } from './seeds/payment-method';
import { orderSeed } from './seeds/order';
import { shippingFeeSeed } from './seeds/shipping-fee';
const prisma = new PrismaClient();

async function main() {
  await shippingFeeSeed(prisma);
  await userSeed(prisma);
  await leadTimeSeed(prisma);
  await brandCategorySeed(prisma);
  await furnitureCategorySeed(prisma);
  await furnitureSeed(prisma);
  await favoriteSeed(prisma);
  await cartSeed(prisma);
  await paymentMethodSeed(prisma);
  await orderSeed(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
