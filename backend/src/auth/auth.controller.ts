import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('connect-wallet')
  async connectWallet(
    @Body() body: { wallet: string; userType: 'customer' | 'merchant' }
  ) {
    return this.authService.saveWallet(body.wallet, body.userType);
  }
}
