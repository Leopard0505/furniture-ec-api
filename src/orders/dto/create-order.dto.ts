import { ApiProperty } from '@nestjs/swagger';
import { UserAddress } from '@prisma/client';

export class CreateOrderDto {
  @ApiProperty({
    enum: ['クレジットカード', '銀行振込'],
    description: '支払い方法',
  })
  paymentMethodLabel: string;

  @ApiProperty({
    example: {
      name: 'john',
      nameKana: 'ジョン',
      email: 'john@prisma.io',
      phoneNo: '09012345678',
      zipCode: '100-0005',
      prefectures: '東京都',
      address: '千代田区丸の内１丁目 東京駅',
    },
    description: '住所',
  })
  address: Omit<UserAddress, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
}
