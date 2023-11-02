import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { RequestUser } from './interface/user.interface';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FurnitureService } from '../furnitures/furniture.service';
import { DeleteFavoriteDto } from './dto/delete-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(
    private prismaService: PrismaService,
    private furnitureService: FurnitureService,
  ) {}

  async furnitures(user: RequestUser) {
    return await this.furnitureService.furnitures({
      take: 8,
      where: {
        favorites: {
          some: {
            userId: user.id,
          },
        },
      },
    });
  }

  async create(user: RequestUser, createFavoriteDto: CreateFavoriteDto) {
    const furniture = await this.furnitureService.furniture({
      id: createFavoriteDto.furnitureItemId,
    });
    if (!furniture) {
      throw new BadRequestException();
    }
    return await this.prismaService.favorite.upsert({
      where: {
        userId_furnitureItemId: {
          userId: user.id,
          furnitureItemId: createFavoriteDto.furnitureItemId,
        },
      },
      update: {},
      create: {
        userId: user.id,
        furnitureItemId: createFavoriteDto.furnitureItemId,
      },
    });
  }

  async delete(user: RequestUser, deleteFavoriteDto: DeleteFavoriteDto) {
    return await this.prismaService.favorite.delete({
      where: {
        userId_furnitureItemId: {
          userId: user.id,
          furnitureItemId: deleteFavoriteDto.furnitureItemId,
        },
      },
    });
  }
}
