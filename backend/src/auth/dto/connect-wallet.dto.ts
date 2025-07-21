import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn } from 'class-validator';

export class ConnectWalletDto {
  @ApiProperty()
  @IsString()
  wallet: string;

  @ApiProperty({ enum: ['customer', 'merchant'] })
  @IsIn(['customer', 'merchant'])
  userType: 'customer' | 'merchant';
}
