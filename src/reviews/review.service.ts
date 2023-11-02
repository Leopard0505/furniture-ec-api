import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prismaService: PrismaService) {}
}
