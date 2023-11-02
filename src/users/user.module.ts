import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../common/prisma.service';
import { UserController } from './user.controller';
import { UserAccountService } from './user-account.service';
import { UserAddressService } from './user-address.service';
import { ProfileController } from './profile.controller';

@Module({
  controllers: [UserController, ProfileController],
  providers: [
    UserService,
    UserAccountService,
    UserAddressService,
    PrismaService,
  ],
  exports: [UserService, UserAccountService],
})
export class UserModule {}
