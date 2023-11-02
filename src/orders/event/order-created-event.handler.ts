import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  EVENT_KEY_ORDER_CREATED,
  OrderCreatedEvent,
} from './order-created.event';
import { OrderService } from '../order.service';
import { MailService } from '../../mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderCreatedEventHandler {
  constructor(
    private orderService: OrderService,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  @OnEvent(EVENT_KEY_ORDER_CREATED)
  async handleOrderCreatedEvent(payload: OrderCreatedEvent) {
    console.group('EVENT: ', EVENT_KEY_ORDER_CREATED);
    console.log({ orderUniqueId: payload.orderUniqueId });
    console.log({ payload: payload.payload });
    const order = await this.orderService.order({
      orderUniqueId: payload.orderUniqueId,
    });
    console.log({ order });
    // TODO: 決済
    // 注文完了メールの送信
    const to = this.configService.get<string>('MAIL_FROM');
    const context = {
      fullname: order.user.account.name,
      shippingFeeAmount: order.shippingFeeAmount,
      totalAmount: order.totalAmount,
    };
    await this.mailService.sendMailForOrderCreated(to, context);
    console.log('Deposited');
    console.groupEnd();
  }
}
