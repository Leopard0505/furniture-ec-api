import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({ example: 1, description: 'FurnitureItemID' })
  furnitureItemId: number;
}
