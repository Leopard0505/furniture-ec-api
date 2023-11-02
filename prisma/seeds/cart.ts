import { PrismaClient } from '@prisma/client';

const generateCart = async (
  prisma: PrismaClient,
  userId: number,
  furnitureItemId: number,
  quantity: number,
) => {
  // カートの存在チェック
  const cart = await prisma.shoppingCart.findUnique({
    where: { userId },
  });
  if (!cart) {
    // カートがないなら作る
    await prisma.shoppingCart.create({
      data: { userId },
    });
  }
  // カート内に条件と一致する家具があれば1個増やす
  // カート内に条件と一致する家具がなければ{quantity}個追加する
  await prisma.shoppingCartOnFurnitureItem.upsert({
    where: {
      shoppingCardId_furnitureItemId: {
        shoppingCardId: userId,
        furnitureItemId,
      },
    },
    update: {},
    create: {
      shoppingCardId: userId,
      furnitureItemId,
      quantity,
    },
  });
};

export const cartSeed = async (prisma: PrismaClient) => {
  await generateCart(prisma, 1, 1, 1);
  await generateCart(prisma, 1, 2, 2);
  await generateCart(prisma, 2, 3, 1);
  await generateCart(prisma, 2, 4, 2);
  await generateCart(prisma, 2, 5, 3);
  await generateCart(prisma, 3, 6, 1);
  await generateCart(prisma, 3, 7, 1);
};
