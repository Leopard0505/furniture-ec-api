import { ApiProperty } from '@nestjs/swagger';

export class UpdateAddressDto {
  @ApiProperty({ example: 1, description: '住所ID' })
  id: number;

  @ApiProperty({ example: 'john', description: '氏名' })
  name: string;

  @ApiProperty({ example: 'ジョン', description: '氏名（カナ）' })
  nameKana: string;

  @ApiProperty({ example: 'john@prisma.io', description: 'メールアドレス' })
  email: string;

  @ApiProperty({ example: '09012345678', description: '電話番号' })
  phoneNo: string;

  @ApiProperty({ example: '112-0004', description: '郵便番号' })
  zipCode: string;

  @ApiProperty({ example: '東京都', description: '都道府県' })
  prefectures: string;

  @ApiProperty({
    example: '文京区後楽１丁目３−６１ 東京ドーム',
    description: '住所',
  })
  address: string;
}
