import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/public.decorator';
import { SignupUserDto } from './users/dto/signup-user.dto';
import { PasswordConfirmGuard } from './auth/password-confirm.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('auth/signup')
  @UseGuards(PasswordConfirmGuard)
  @ApiTags('/auth')
  @ApiOperation({ summary: 'サインアップAPI' })
  @ApiResponse({
    status: 201,
    description: 'ユーザーの登録',
  })
  async signup(@Body() signupUserDto: SignupUserDto) {
    return this.authService.signup(signupUserDto);
  }

  @Public()
  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  @ApiTags('/auth')
  @ApiOperation({ summary: 'ログインAPI' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'john',
        },
        password: {
          type: 'string',
          example: 'testtest',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'ユーザーのログイン&アクセストークンを発行',
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
