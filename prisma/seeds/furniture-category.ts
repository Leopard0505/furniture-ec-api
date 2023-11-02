import { PrismaClient } from '@prisma/client';

const generateFurnitureCategory = async (
  prisma: PrismaClient,
  label: string,
  value: string,
) => {
  await prisma.furnitureCategory.upsert({
    where: { label },
    update: {},
    create: {
      label,
      value,
    },
  });
};

export const furnitureCategorySeed = async (prisma: PrismaClient) => {
  await generateFurnitureCategory(prisma, 'ソファ', 'ソファ');
  await generateFurnitureCategory(prisma, 'テレビ台', 'テレビ台');
  await generateFurnitureCategory(prisma, '収納', '収納');
  await generateFurnitureCategory(
    prisma,
    '生活用品・インテリア雑貨',
    '生活用品・インテリア雑貨',
  );
  await generateFurnitureCategory(prisma, 'ベッド', 'ベッド');
  await generateFurnitureCategory(prisma, 'キッチン', 'キッチン');
  await generateFurnitureCategory(prisma, '机・デスク', '机・デスク');
  await generateFurnitureCategory(prisma, 'ダイニング', 'ダイニング');
  await generateFurnitureCategory(prisma, 'チェア・椅子', 'チェア・椅子');
  await generateFurnitureCategory(prisma, 'テーブル', 'テーブル');
  await generateFurnitureCategory(prisma, '座椅子', '座椅子');
  await generateFurnitureCategory(prisma, 'ラグ・マット', 'ラグ・マット');
  await generateFurnitureCategory(prisma, '証明', '証明');
  await generateFurnitureCategory(prisma, '家電', '家電');
  await generateFurnitureCategory(prisma, 'マットレス', 'マットレス');
  await generateFurnitureCategory(prisma, '布団・寝具', '布団・寝具');
  await generateFurnitureCategory(prisma, '布団・寝具', '布団・寝具');
  await generateFurnitureCategory(prisma, 'オフィス', 'オフィス');
  await generateFurnitureCategory(
    prisma,
    'ランドリー・バス・トイレ用品',
    'ランドリー・バス・トイレ用品',
  );
  await generateFurnitureCategory(
    prisma,
    'ガーデンファニチャー',
    'ガーデンファニチャー',
  );
  await generateFurnitureCategory(prisma, 'アウトドア', 'アウトドア');
  await generateFurnitureCategory(prisma, 'カーテン', 'カーテン');
  await generateFurnitureCategory(prisma, 'ルームウェア', 'ルームウェア');
  await generateFurnitureCategory(prisma, 'コラボITEM', 'コラボITEM');
};
