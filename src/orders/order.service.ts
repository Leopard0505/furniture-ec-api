import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from '../common/prisma.service';
import { RequestUser } from '../users/interface/user.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  EVENT_KEY_ORDER_CREATED,
  OrderCreatedEvent,
} from './event/order-created.event';
import { ShoppingCartService } from '../cart/cart.service';

@Injectable()
export class OrderService {
  constructor(
    private prismaService: PrismaService,
    private shoppingCartService: ShoppingCartService,
    private eventEmitter: EventEmitter2,
  ) {}

  async orders(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderWhereUniqueInput;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.order.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async order(orderWhereUniqueInput: Prisma.OrderWhereUniqueInput) {
    return await this.prismaService.order.findUnique({
      where: orderWhereUniqueInput,
      include: {
        user: {
          include: {
            account: true,
          },
        },
        address: true,
        items: true,
      },
    });
  }

  async create(user: RequestUser, createOrderDto: CreateOrderDto) {
    // カートから家具を取得
    const shoppingCartOnFurnitureItems =
      await this.shoppingCartService.shoppingCartOnFurnitureItems(user.id);
    // 税率を取得
    const saleTaxRate = 8;
    // 家具料金（税込）の計算
    const furnitureAmount =
      (shoppingCartOnFurnitureItems.reduce(
        (prev, next) => prev + next.furniture.amount * next.quantity,
        0,
      ) *
        saleTaxRate) /
      100;
    // 支払い方法による追加料金の算出
    const paymentMethod = await this.prismaService.paymentMethod.findUnique({
      where: { label: createOrderDto.paymentMethodLabel },
    });
    // 発送先による追加料金の算出
    const shippingFee = await this.prismaService.shippingFee.findUnique({
      where: { prefectures: createOrderDto.address.prefectures },
    });
    // カート内の家具で一番遅い製造期間を取得
    const [leadTime, _] = shoppingCartOnFurnitureItems
      .map((item) => item.furniture.furniture.leadTime)
      .sort((a, b) => (a.value < b.value ? 1 : -1));
    // 購入する家具情報を生成
    const orderOnFurnitureItems = shoppingCartOnFurnitureItems.map((item) => ({
      furnitureItemId: item.furnitureItemId,
      quantity: item.quantity,
    }));
    // 注文ユニークIDの生成
    const orderUniqueId = randomUUID();
    // 注文の登録
    const order = await this.prismaService.order.create({
      data: {
        orderUniqueId,
        userId: 1, // ユーザーIDを指定
        shippingFeeAmount: shippingFee.amount, // 送料金額を指定
        paymentMethodLabel: paymentMethod.label, // 支払い方法のラベルを指定
        paymentMethodAmount: paymentMethod.amount, // 支払い方法の金額を指定
        saleTaxRate,
        totalAmount:
          furnitureAmount + paymentMethod.amount + shippingFee.amount, // 合計金額を指定
        leadTimeLabel: leadTime.label,
        leadTimeValue: leadTime.value,
        // 送付先情報
        address: {
          create: {
            name: createOrderDto.address.name,
            nameKana: createOrderDto.address.nameKana,
            email: createOrderDto.address.email,
            phoneNo: createOrderDto.address.phoneNo,
            zipCode: createOrderDto.address.zipCode,
            prefectures: createOrderDto.address.prefectures,
            address: createOrderDto.address.address,
          },
        },
        // カート情報
        items: {
          create: orderOnFurnitureItems,
        },
      },
    });

    this.eventEmitter.emit(
      EVENT_KEY_ORDER_CREATED,
      new OrderCreatedEvent({
        orderUniqueId,
        payload: {},
      }),
    );

    return order;
  }
}
