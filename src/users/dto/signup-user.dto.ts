import { ApiProperty } from '@nestjs/swagger';

export class SignupUserDto {
  @ApiProperty({ example: 'john', description: 'ユーザー名' })
  username: string;

  @ApiProperty({ example: 'testtest', description: 'パスワード' })
  password: string;

  @ApiProperty({ example: 'testtest', description: '確認パスワード' })
  password_confirm: string;
}
