import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async categories(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FurnitureCategoryWhereUniqueInput;
    where?: Prisma.FurnitureCategoryWhereInput;
    orderBy?: Prisma.FurnitureCategoryOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prismaService.furnitureCategory.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async category(
    furnitureCategoryWhereUniqueInput: Prisma.FurnitureCategoryWhereUniqueInput,
  ) {
    return await this.prismaService.furnitureCategory.findUnique({
      where: furnitureCategoryWhereUniqueInput,
      select: {
        label: true,
        value: true,
        funitures: {
          take: 20,
          select: {
            furniture: true,
          },
        },
      },
    });
  }
}
