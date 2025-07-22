// src/merchant/merchant.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Post('questionnaire')
  async submitQuestionnaire(@Body() data: CreateMerchantDto) {
    return this.merchantService.create(data);
  }
}
