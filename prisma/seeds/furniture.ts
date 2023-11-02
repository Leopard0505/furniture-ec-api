import { PrismaClient } from '@prisma/client';
import { LEAD_TIME } from '../constants';

const generateFurniture = async (
  prisma: PrismaClient,
  name: string,
  brandCategoryLabel: string,
  leadTimeLabel: string,
  furnitureCategoryLabel: string,
) => {
  await prisma.furniture.upsert({
    where: { name },
    update: {},
    create: {
      name,
      brandCategoryLabel,
      leadTimeLabel,
      furnitureCategories: {
        create: [
          {
            furnitureCategoryLabel,
          },
        ],
      },
      items: {
        create: [
          {
            description:
              'ここに詳細説明が入ります。ここに詳細説明が入ります。ここに詳細説明が入ります。ここに詳細説明が入ります。ここに詳細説明が入ります。',
            size: '幅172×奥行126×高さ80cm（座面高38cm）',
            color: 'アイボリー',
            weight: '約40kg',
            amount: 39990,
            image: 'https://placehold.jp/600x600.png',
          },
          {
            description:
              'ここに詳細説明が入ります。ここに詳細説明が入ります。ここに詳細説明が入ります。ここに詳細説明が入ります。ここに詳細説明が入ります。',
            size: '幅158×奥行126×高さ80cm（座面高38cm）',
            color: 'アイボリー',
            weight: '約34kg',
            amount: 29990,
            image: 'https://placehold.jp/600x600.png',
          },
          {
            description:
              'ここに詳細説明が入ります。ここに詳細説明が入ります。ここに詳細説明が入ります。ここに詳細説明が入ります。ここに詳細説明が入ります。',
            size: '幅172×奥行126×高さ80cm（座面高38cm）',
            color: 'ブラック',
            weight: '約40kg',
            amount: 39990,
            image: 'https://placehold.jp/600x600.png',
          },
          {
            description:
              'ここに詳細説明が入ります。ここに詳細説明が入ります。ここに詳細説明が入ります。ここに詳細説明が入ります。ここに詳細説明が入ります。',
            size: '幅158×奥行126×高さ80cm（座面高38cm）',
            color: 'ブラック',
            weight: '約34kg',
            amount: 29990,
            image: 'https://placehold.jp/600x600.png',
          },
        ],
      },
    },
  });
};

export const furnitureSeed = async (prisma: PrismaClient) => {
  await generateFurniture(
    prisma,
    '3人掛け カウチソファ 万能レイアウト クッション付き',
    'LOWYA',
    LEAD_TIME.THREE_MONTH.LABEL,
    'ソファ',
  );
  await generateFurniture(
    prisma,
    '3人掛け カウチソファ ハイバックソファ',
    'LOWYA',
    LEAD_TIME.THREE_MONTH.LABEL,
    'ソファ',
  );
  await generateFurniture(
    prisma,
    '2人掛け カウチソファ ハイバックソファ',
    'WTW',
    LEAD_TIME.ONE_MONTH.LABEL,
    'ソファ',
  );
  await generateFurniture(
    prisma,
    '2人掛け コンパクトソファ クッション付き',
    'WTW',
    LEAD_TIME.ONE_MONTH.LABEL,
    'ソファ',
  );
  await generateFurniture(
    prisma,
    '2人掛け 肉厚フロアソファ リクライニング',
    'La Forma',
    LEAD_TIME.ONE_MONTH.LABEL,
    'ソファ',
  );
  await generateFurniture(
    prisma,
    '2人掛け 天然木脚ソファ',
    'La Forma',
    LEAD_TIME.ONE_MONTH.LABEL,
    'ソファ',
  );
  await generateFurniture(
    prisma,
    '2人掛け カウチソファ ベルベット調 天然木',
    'LOWYA',
    LEAD_TIME.ONE_MONTH.LABEL,
    'ソファ',
  );
  await generateFurniture(
    prisma,
    '2人掛け カウチソファ クッション付き',
    'LOWYA',
    LEAD_TIME.TEN_DAYS.LABEL,
    'ソファ',
  );
  await generateFurniture(
    prisma,
    '3人掛け カウチソファ ベルベット調',
    'LOWYA',
    LEAD_TIME.TEN_DAYS.LABEL,
    'ソファ',
  );
  await generateFurniture(
    prisma,
    '2人掛け リクライニングソファ 天然木脚',
    'LOWYA',
    LEAD_TIME.FIVE_DAYS.LABEL,
    'ソファ',
  );
};
