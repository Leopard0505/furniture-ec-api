import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Public } from '../auth/public.decorator';

@Public()
@ApiTags('/categories')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: '家具カテゴリ一覧取得API' })
  @ApiResponse({
    status: 201,
    description: '家具カテゴリ一覧',
  })
  async categories() {
    return await this.categoryService.categories({});
  }

  @Get(':furnitureCategoryValue')
  @ApiOperation({ summary: '家具カテゴリ取得API' })
  @ApiParam({
    name: 'furnitureCategoryValue',
    enum: [
      'ソファ',
      'テレビ台',
      '収納',
      '生活用品・インテリア雑貨',
      'ベッド',
      'キッチン',
      '机・デスク',
      'ダイニング',
      'チェア・椅子',
    ],
  })
  @ApiResponse({
    status: 201,
    description: '家具カテゴリ詳細',
  })
  async category(
    @Param('furnitureCategoryValue') furnitureCategoryValue: string,
  ) {
    return this.categoryService.category({ value: furnitureCategoryValue });
  }
}
