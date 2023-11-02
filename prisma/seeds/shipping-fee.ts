import { PrismaClient } from '@prisma/client';

const generateShippingFee = async (
  prisma: PrismaClient,
  prefectures: string,
  amount: number,
) => {
  await prisma.shippingFee.upsert({
    where: { prefectures },
    update: {},
    create: {
      prefectures,
      amount,
    },
  });
};

export const shippingFeeSeed = async (prisma: PrismaClient) => {
  await generateShippingFee(prisma, '北海道', 1180);
  await generateShippingFee(prisma, '青森県', 860);
  await generateShippingFee(prisma, '岩手県', 860);
  await generateShippingFee(prisma, '秋田県', 860);
  await generateShippingFee(prisma, '宮城県', 750);
  await generateShippingFee(prisma, '山形県', 750);
  await generateShippingFee(prisma, '福島県', 750);
  await generateShippingFee(prisma, '茨城県', 750);
  await generateShippingFee(prisma, '栃木県', 750);
  await generateShippingFee(prisma, '群馬県', 750);
  await generateShippingFee(prisma, '埼玉県', 750);
  await generateShippingFee(prisma, '千葉県', 750);
  await generateShippingFee(prisma, '東京都', 750);
  await generateShippingFee(prisma, '神奈川県', 750);
  await generateShippingFee(prisma, '山梨県', 750);
  await generateShippingFee(prisma, '長野県', 750);
  await generateShippingFee(prisma, '新潟県', 750);
  await generateShippingFee(prisma, '富山県', 750);
  await generateShippingFee(prisma, '石川県', 750);
  await generateShippingFee(prisma, '福井県', 750);
  await generateShippingFee(prisma, '岐阜県', 750);
  await generateShippingFee(prisma, '静岡県', 750);
  await generateShippingFee(prisma, '愛知県', 750);
  await generateShippingFee(prisma, '三重県', 750);
  await generateShippingFee(prisma, '滋賀県', 860);
  await generateShippingFee(prisma, '京都府', 860);
  await generateShippingFee(prisma, '大阪府', 860);
  await generateShippingFee(prisma, '兵庫県', 860);
  await generateShippingFee(prisma, '奈良県', 860);
  await generateShippingFee(prisma, '和歌山県', 860);
  await generateShippingFee(prisma, '鳥取県', 970);
  await generateShippingFee(prisma, '島根県', 970);
  await generateShippingFee(prisma, '岡山県', 970);
  await generateShippingFee(prisma, '広島県', 970);
  await generateShippingFee(prisma, '山口県', 970);
  await generateShippingFee(prisma, '徳島県', 1080);
  await generateShippingFee(prisma, '香川県', 1080);
  await generateShippingFee(prisma, '愛媛県', 1080);
  await generateShippingFee(prisma, '高知県', 1080);
  await generateShippingFee(prisma, '福岡県', 1180);
  await generateShippingFee(prisma, '佐賀県', 1180);
  await generateShippingFee(prisma, '長崎県', 1180);
  await generateShippingFee(prisma, '熊本県', 1180);
  await generateShippingFee(prisma, '大分県', 1180);
  await generateShippingFee(prisma, '宮崎県', 1180);
  await generateShippingFee(prisma, '鹿児島県', 1180);
  await generateShippingFee(prisma, '沖縄県', 1880);
};
