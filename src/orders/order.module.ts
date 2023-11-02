import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from '../common/prisma.service';
import { OrderCreatedEventHandler } from './event/order-created-event.handler';
import { ShoppingCartService } from '../cart/cart.service';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    PrismaService,
    OrderCreatedEventHandler,
    ShoppingCartService,
    MailService,
    ConfigService,
  ],
})
export class OrderModule {}
