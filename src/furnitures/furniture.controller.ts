import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/public.decorator';
import { FurnitureService } from './furniture.service';

@Public()
@ApiTags('/furnitures')
@Controller('furnitures')
export class FurnitureController {
  constructor(private furnitureService: FurnitureService) {}

  // よく売れる OR お気に入り数が多い
  // 人気
  @Get('/popularity')
  @ApiOperation({ summary: '人気家具一覧取得API' })
  @ApiResponse({
    status: 201,
    description: '人気家具一覧',
  })
  async popularityFurnitures() {
    return await this.furnitureService.furnitures({
      take: 20,
      orderBy: {
        orderOnFurnitureItem: {
          _count: 'desc',
        },
        favorites: {
          _count: 'desc',
        },
      },
    });
  }

  // 新着
  @Get('/new')
  @ApiOperation({ summary: '新着家具一覧取得API' })
  @ApiResponse({
    status: 201,
    description: '新着家具一覧',
  })
  async newFurnitures() {
    return this.furnitureService.furnitures({
      take: 20,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
