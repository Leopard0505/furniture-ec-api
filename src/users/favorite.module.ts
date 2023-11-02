import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { PrismaService } from '../common/prisma.service';
import { FurnitureService } from '../furnitures/furniture.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService, PrismaService, FurnitureService],
})
export class FavoriteModule {}
