import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { RequestUser } from '../users/interface/user.interface';
import { AddFurnitureDto } from './dto/add-furniture.dto';
import { RemoveFurnitureDto } from './dto/remove-furniture.dto';

@Injectable()
export class ShoppingCartService {
  constructor(private prismaService: PrismaService) {}

  async shoppingCart(
    shoppingCartWhereUniqueInput: Prisma.ShoppingCartWhereUniqueInput,
  ) {
    return await this.prismaService.shoppingCart.findUnique({
      where: shoppingCartWhereUniqueInput,
      select: {
        items: {
          select: {
            furnitureItemId: true,
            furnitureItem: {
              select: {
                furniture: {
                  select: {
                    name: true,
                    furnitureCategories: {
                      select: {
                        furnitureCategoryLabel: true,
                      },
                    },
                    brandCategoryLabel: true,
                    leadTimeLabel: true,
                    leadTime: true,
                  },
                },
                description: true,
                size: true,
                color: true,
                weight: true,
                amount: true,
                image: true,
                favorites: {
                  select: {
                    furnitureItemId: true,
                    assignedAt: true,
                  },
                },
              },
            },
            quantity: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async shoppingCartOnFurnitureItems(userId: number) {
    const shoppingCart = await this.shoppingCart({ userId });
    return shoppingCart.items.map((item) => {
      return {
        furnitureItemId: item.furnitureItemId,
        furniture: item.furnitureItem,
        quantity: item.quantity,
      };
    });
  }

  async add(user: RequestUser, addFurnitureDto: AddFurnitureDto) {
    // カートの存在チェック
    const cart = await this.prismaService.shoppingCart.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (!cart) {
      // カートがないなら作る
      await this.prismaService.shoppingCart.create({
        data: {
          userId: user.id,
        },
      });
    }
    // カート内に条件と一致する家具があれば1個増やす
    // カート内に条件と一致する家具がなければ{quantity}個追加する
    return await this.prismaService.shoppingCartOnFurnitureItem.upsert({
      where: {
        shoppingCardId_furnitureItemId: {
          shoppingCardId: user.id,
          furnitureItemId: addFurnitureDto.furnitureItemId,
        },
      },
      update: {
        quantity: {
          increment: addFurnitureDto.quantity,
        },
      },
      create: {
        shoppingCardId: user.id,
        furnitureItemId: addFurnitureDto.furnitureItemId,
        quantity: addFurnitureDto.quantity,
      },
    });
  }

  async remove(user: RequestUser, removeFurnitureDto: RemoveFurnitureDto) {
    const shoppingCartOnFurnitureItem =
      await this.prismaService.shoppingCartOnFurnitureItem.update({
        where: {
          shoppingCardId_furnitureItemId: {
            shoppingCardId: user.id,
            furnitureItemId: removeFurnitureDto.furnitureItemId,
          },
        },
        data: {
          quantity: {
            decrement: removeFurnitureDto.quantity,
          },
        },
      });
    if (shoppingCartOnFurnitureItem.quantity <= 0) {
      // 0以下ならカートから家具を削除する
      return await this.prismaService.shoppingCartOnFurnitureItem.delete({
        where: {
          shoppingCardId_furnitureItemId: {
            shoppingCardId: user.id,
            furnitureItemId: removeFurnitureDto.furnitureItemId,
          },
        },
      });
    }
    return shoppingCartOnFurnitureItem;
  }
}
