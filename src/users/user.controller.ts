import { Controller, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../common/decorator/user.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestUser } from './interface/user.interface';

@ApiTags('/users')
@ApiBearerAuth('access_token')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Delete()
  @ApiOperation({ summary: '退会API' })
  @ApiResponse({
    status: 201,
    description: 'ユーザーの退会',
  })
  async withdrawal(@User() user: RequestUser) {
    // TODO: 退会の理由と要望内容、改善点をDTOで受け取る
    return await this.userService.delete(user.id);
  }
}
