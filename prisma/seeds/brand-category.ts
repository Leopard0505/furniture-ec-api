import { PrismaClient } from '@prisma/client';

const generateBrandCategory = async (
  prisma: PrismaClient,
  label: string,
  value: string,
) => {
  await prisma.brandCategory.upsert({
    where: { label },
    update: {},
    create: {
      label,
      value,
    },
  });
};

export const brandCategorySeed = async (prisma: PrismaClient) => {
  await generateBrandCategory(prisma, 'LOWYA', 'ロウヤ');
  await generateBrandCategory(prisma, 'WTW', 'ダブルティー');
  await generateBrandCategory(prisma, 'La Forma', 'ラフォーマ');
  await generateBrandCategory(prisma, 'Joseph Joseph', 'ジョセフジョセフ');
  await generateBrandCategory(prisma, 'Wpc.', 'ダブリュビーシー');
};
