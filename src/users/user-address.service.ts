import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { RequestUser } from './interface/user.interface';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class UserAddressService {
  constructor(private prismaService: PrismaService) {}

  async create(user: RequestUser, createAddressDto: CreateAddressDto) {
    return await this.prismaService.userAddress.create({
      data: {
        userId: user.id,
        name: createAddressDto.name,
        nameKana: createAddressDto.nameKana,
        email: createAddressDto.email,
        phoneNo: createAddressDto.phoneNo,
        zipCode: createAddressDto.zipCode,
        prefectures: createAddressDto.prefectures,
        address: createAddressDto.address,
      },
    });
  }

  async update(user: RequestUser, updateAddressDto: UpdateAddressDto) {
    return await this.prismaService.userAddress.update({
      where: { id: updateAddressDto.id, userId: user.id },
      data: {
        name: updateAddressDto.name,
        nameKana: updateAddressDto.nameKana,
        email: updateAddressDto.email,
        phoneNo: updateAddressDto.phoneNo,
        zipCode: updateAddressDto.zipCode,
        prefectures: updateAddressDto.prefectures,
        address: updateAddressDto.address,
      },
    });
  }

  async delete(user: RequestUser, id: number) {
    return await this.prismaService.userAddress.delete({
      where: { id, userId: user.id },
    });
  }
}
