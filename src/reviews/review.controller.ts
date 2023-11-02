import { Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../common/decorator/user.decorator';
import { RequestUser } from '../users/interface/user.interface';

@ApiTags('/reviews')
@ApiBearerAuth('access_token')
@Controller()
export class ReviewController {
  constructor() {}

  @Post()
  @ApiOperation({ summary: '購入した家具をレビューするAPI' })
  @ApiResponse({
    status: 201,
    description: 'レビュー',
  })
  async create(@User() user: RequestUser) {
    return '';
  }
}
