// src/merchant/merchant.module.ts
import { Module } from '@nestjs/common';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  // imports: [PrismaService],
  controllers: [MerchantController],
  providers: [MerchantService, PrismaService],
  exports: [MerchantService],
})
export class MerchantModule {}
