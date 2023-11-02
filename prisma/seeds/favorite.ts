import { PrismaClient } from '@prisma/client';

const generateFavorite = async (
  prisma: PrismaClient,
  userId: number,
  furnitureItemId: number,
) => {
  await prisma.favorite.upsert({
    where: {
      userId_furnitureItemId: {
        userId,
        furnitureItemId,
      },
    },
    update: {},
    create: {
      userId,
      furnitureItemId,
    },
  });
};

export const favoriteSeed = async (prisma: PrismaClient) => {
  await generateFavorite(prisma, 1, 1);
  await generateFavorite(prisma, 1, 2);
  await generateFavorite(prisma, 1, 3);
  await generateFavorite(prisma, 1, 4);
  await generateFavorite(prisma, 2, 2);
  await generateFavorite(prisma, 2, 3);
  await generateFavorite(prisma, 2, 4);
  await generateFavorite(prisma, 2, 5);
  await generateFavorite(prisma, 3, 1);
  await generateFavorite(prisma, 3, 4);
  await generateFavorite(prisma, 3, 5);
  await generateFavorite(prisma, 3, 6);
};
