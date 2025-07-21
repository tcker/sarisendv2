import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConnectWalletDto } from './dto/connect-wallet.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('connect-wallet')
  async connectWallet(@Body() connectWalletDto: ConnectWalletDto) {
    return this.authService.saveWallet(
      connectWalletDto.wallet,
      connectWalletDto.userType,
    );
  }
}
