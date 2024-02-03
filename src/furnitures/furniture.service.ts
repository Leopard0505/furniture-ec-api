import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class FurnitureService {
  constructor(private prismaService: PrismaService) {}

  async furniture(
    furnitureItemWhereUniqueInput: Prisma.FurnitureItemWhereUniqueInput,
  ) {
    return await this.prismaService.furnitureItem.findUnique({
      where: furnitureItemWhereUniqueInput,
    });
  }

  async furnitures(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FurnitureItemWhereUniqueInput;
    where?: Prisma.FurnitureItemWhereInput;
    orderBy?: Prisma.FurnitureItemOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prismaService.furnitureItem.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        furniture: {
          include: {
            furnitureCategories: true,
            brandCategory: true,
            leadTime: true,
          },
        },
        favorites: true,
        orderOnFurnitureItem: true,
        _count: {
          select: {
            favorites: true,
            orderOnFurnitureItem: true,
          },
        },
      },
    });
  }
}
