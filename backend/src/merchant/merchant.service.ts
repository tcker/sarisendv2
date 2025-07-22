// src/merchant/merchant.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';

@Injectable()
export class MerchantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMerchantDto) {
    return this.prisma.merchant.create({
      data,
    });
  }
}
