import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../common/decorator/user.decorator';
import { RequestUser } from '../users/interface/user.interface';
import { ShoppingCartService } from './cart.service';
import { AddFurnitureDto } from './dto/add-furniture.dto';
import { RemoveFurnitureDto } from './dto/remove-furniture.dto';

@ApiTags('/cart')
@ApiBearerAuth('access_token')
@Controller('cart')
export class ShoppingCartController {
  constructor(private shoppingCartService: ShoppingCartService) {}

  @Get()
  @ApiOperation({
    summary: 'ショッピングカート内の家具と購入予定数量一覧取得API',
  })
  @ApiResponse({
    status: 201,
    description: 'ショッピングカート',
  })
  async shoppingCart(@User() user: RequestUser) {
    return await this.shoppingCartService.shoppingCart({
      userId: user.id,
    });
  }

  @Post()
  @ApiOperation({
    summary: 'ショッピングカートに家具と購入予定数量を追加API',
  })
  @ApiResponse({
    status: 201,
    description: 'ショッピングカート',
  })
  async addFurniture(
    @User() user: RequestUser,
    @Body() addFurnitureDto: AddFurnitureDto,
  ) {
    await this.shoppingCartService.add(user, addFurnitureDto);
    return await this.shoppingCartService.shoppingCart({
      userId: user.id,
    });
  }

  @Put()
  @ApiOperation({
    summary: 'ショッピングカートから家具と購入予定数量を削除API',
  })
  @ApiResponse({
    status: 201,
    description: 'ショッピングカート',
  })
  async removeFurniture(
    @User() user: RequestUser,
    @Body() removeFurnitureDto: RemoveFurnitureDto,
  ) {
    await this.shoppingCartService.remove(user, removeFurnitureDto);
    return await this.shoppingCartService.shoppingCart({
      userId: user.id,
    });
  }
}
