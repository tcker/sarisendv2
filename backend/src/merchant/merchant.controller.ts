// src/merchant/merchant.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';

@Controller('merchants') 
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Post()
  async create(@Body() body: CreateMerchantDto) {
    console.log('Incoming merchant payload:', body);
    return this.merchantService.create(body); 
  }
}
