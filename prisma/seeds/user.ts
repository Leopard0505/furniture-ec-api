import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// ハッシュ化
const generateHash = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return {
    salt,
    hash,
  };
};

const generateUser = async (prisma: PrismaClient, name: string) => {
  const password = 'testtest';
  const { hash } = await generateHash(password);
  await prisma.userAccount.upsert({
    where: { name: name },
    update: {},
    create: {
      name,
      hash,
      user: {
        create: {
          email: `${name}@prisma.io`,
        },
      },
    },
  });
};

export const userSeed = async (prisma: PrismaClient) => {
  await generateUser(prisma, 'alice');
  await generateUser(prisma, 'john');
  await generateUser(prisma, 'maria');
  await generateUser(prisma, 'bob');
};
