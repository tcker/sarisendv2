// src/merchant/dto/create-merchant.dto.ts
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateMerchantDto {
  @IsString() businessName: string;
  @IsString() businessType: string;
  @IsString() ownerName: string;
  @IsEmail() email: string;
  @IsString() phone: string;
  @IsString() address: string;
  @IsString() city: string;
  @IsString() country: string;
  @IsString() businessRegistration: string;
  @IsString() taxId: string;
  @IsString() website: string;
  @IsString() monthlyRevenue: string;
  @IsString() description: string;

  @IsOptional() @IsString() wallet?: string;
}
