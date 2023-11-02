import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../common/decorator/user.decorator';
import { RequestUser } from '../users/interface/user.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@ApiTags('/orders')
@ApiBearerAuth('access_token')
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: '注文一覧取得API' })
  @ApiResponse({
    status: 201,
    description: '注文一覧',
  })
  async orders(@User() user: RequestUser) {
    return await this.orderService.orders({
      take: 20,
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Get(':uniqueId')
  @ApiOperation({ summary: '注文取得API' })
  @ApiParam({
    enum: ['ORDER_000001', 'ORDER_000002', 'ORDER_000003', 'ORDER_000004'],
    name: 'uniqueId',
  })
  @ApiResponse({
    status: 201,
    description: '注文',
  })
  async order(@User() user: RequestUser, @Param('uniqueId') uniqueId: string) {
    return await this.orderService.order({
      userId: user.id,
      orderUniqueId: uniqueId,
    });
  }

  @Post()
  @ApiOperation({
    summary: 'ユーザーが家具を購入するAPI',
  })
  @ApiResponse({
    status: 201,
    description: '注文',
  })
  async create(
    @User() user: RequestUser,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return await this.orderService.create(user, createOrderDto);
  }
}
