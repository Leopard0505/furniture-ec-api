import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserAddressService } from './user-address.service';
import { User } from '../common/decorator/user.decorator';
import { RequestUser } from './interface/user.interface';
import { UserService } from './user.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiTags('/users/profile')
@ApiBearerAuth('access_token')
@Controller('users/profile')
export class ProfileController {
  constructor(
    private userService: UserService,
    private userAddressService: UserAddressService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'プロフィール取得API' })
  @ApiResponse({
    status: 201,
    description: 'ユーザー情報',
  })
  async getProfile(@User() user: RequestUser) {
    return await this.userService.findOne(user);
  }

  @Post('address')
  @ApiOperation({ summary: '住所登録API' })
  @ApiResponse({
    status: 201,
    description: 'ユーザー住所',
  })
  async createAddress(
    @User() user: RequestUser,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return await this.userAddressService.create(user, createAddressDto);
  }

  @Put('address')
  @ApiOperation({ summary: '住所更新API' })
  @ApiResponse({
    status: 201,
    description: 'ユーザー住所更新',
  })
  async updateAddress(
    @User() user: RequestUser,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return await this.userAddressService.update(user, updateAddressDto);
  }

  @Delete('address/:id')
  @ApiOperation({ summary: '住所削除API' })
  @ApiResponse({
    status: 201,
    description: 'ユーザー住所削除',
  })
  async deleteAddress(
    @User() user: RequestUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.userAddressService.delete(user, id);
  }
}
