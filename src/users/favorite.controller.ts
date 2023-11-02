import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FavoriteService } from './favorite.service';
import { User } from '../common/decorator/user.decorator';
import { RequestUser } from './interface/user.interface';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { DeleteFavoriteDto } from './dto/delete-favorite.dto';

@ApiTags('/favorite')
@ApiBearerAuth('access_token')
@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  @ApiOperation({ summary: 'お気に入り取得API' })
  @ApiResponse({
    status: 201,
    description: 'お気に入り取得',
  })
  async favorite(@User() user: RequestUser) {
    return await this.favoriteService.furnitures(user);
  }

  @Post()
  @ApiOperation({ summary: 'お気に入り登録API' })
  @ApiResponse({
    status: 201,
    description: 'お気に入り登録',
  })
  async create(
    @User() user: RequestUser,
    @Body() createFavoriteDto: CreateFavoriteDto,
  ) {
    return await this.favoriteService.create(user, createFavoriteDto);
  }

  @Delete()
  @ApiOperation({ summary: 'お気に入り削除API' })
  @ApiResponse({
    status: 201,
    description: 'お気に入り削除',
  })
  async delete(
    @User() user: RequestUser,
    @Body() deleteFavoriteDto: DeleteFavoriteDto,
  ) {
    return await this.favoriteService.delete(user, deleteFavoriteDto);
  }
}
