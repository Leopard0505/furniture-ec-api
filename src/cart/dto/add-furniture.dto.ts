import { ApiProperty } from '@nestjs/swagger';

export class AddFurnitureDto {
  @ApiProperty({ example: 1, description: 'FurnitureItemID' })
  furnitureItemId: number;

  @ApiProperty({ example: 1, description: '数量' })
  quantity: number;
}
