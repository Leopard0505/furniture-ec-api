import { PrismaClient } from '@prisma/client';
import { ILEAD_TIME, LEAD_TIME } from '../constants';

const generateLeadTime = async (prisma: PrismaClient, leadTime: ILEAD_TIME) => {
  await prisma.leadTime.upsert({
    where: { label: leadTime.LABEL },
    update: {},
    create: {
      label: leadTime.LABEL,
      value: leadTime.VALUE,
    },
  });
};

export const leadTimeSeed = async (prisma: PrismaClient) => {
  await generateLeadTime(prisma, LEAD_TIME.FIVE_DAYS);
  await generateLeadTime(prisma, LEAD_TIME.TEN_DAYS);
  await generateLeadTime(prisma, LEAD_TIME.ONE_MONTH);
  await generateLeadTime(prisma, LEAD_TIME.TWO_MONTH);
  await generateLeadTime(prisma, LEAD_TIME.THREE_MONTH);
};
