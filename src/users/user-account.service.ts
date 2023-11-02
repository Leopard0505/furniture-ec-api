import { Injectable } from '@nestjs/common';
import { UserAccount } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class UserAccountService {
  constructor(private prismaService: PrismaService) {}

  async findOne(username: string): Promise<UserAccount | undefined> {
    return await this.prismaService.userAccount.findUnique({
      where: { name: username },
    });
  }
}
