import { Module } from '@nestjs/common';
import { ShoppingCartController } from './cart.controller';
import { ShoppingCartService } from './cart.service';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService, PrismaService],
})
export class ShoppingCartModule {}
