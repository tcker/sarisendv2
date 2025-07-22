// src/merchant/dto/create-merchant.dto.ts
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateMerchantDto {
  @IsString() businessName: string;
  @IsOptional() @IsString() businessType?: string;
  @IsOptional() @IsString() ownerName?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() country?: string;
  @IsOptional() @IsString() businessRegistration?: string;
  @IsOptional() @IsString() taxId?: string;
  @IsOptional() @IsString() website?: string;
  @IsOptional() @IsString() monthlyRevenue?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() wallet?: string;
}
