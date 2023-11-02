import { Module } from '@nestjs/common';
import { FurnitureController } from './furniture.controller';
import { FurnitureService } from './furniture.service';
import { PrismaService } from '../common/prisma.service';

@Module({
  controllers: [FurnitureController],
  providers: [FurnitureService, PrismaService],
})
export class FurnitureModule {}
