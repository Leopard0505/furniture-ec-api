import { Injectable } from '@nestjs/common';
import { Role } from '../common/roles/role.enum';
import { PrismaService } from '../common/prisma.service';
import { User } from '@prisma/client';
import { RequestUser } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(username: string, hash: string) {
    return await this.prismaService.userAccount.create({
      data: {
        name: username,
        hash,
        user: {
          create: {},
        },
      },
    });
  }

  async findOne(account: RequestUser): Promise<User | undefined> {
    return await this.prismaService.user.findUnique({
      include: {
        account: true,
        addresses: true,
      },
      where: {
        accountId: account.id,
      },
    });
  }

  async delete(id: number) {
    return await this.prismaService.$transaction(async (prisma) => {
      const account = await prisma.userAccount.delete({ where: { id } });
      return this.prismaService.user.delete({
        where: { accountId: account.id },
      });
    });
  }
}
