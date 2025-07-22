import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async saveWallet(wallet: string, userType: 'customer' | 'merchant') {
  console.log('✅ Received wallet:', wallet);
  console.log('✅ Received userType:', userType);
    if (userType === 'customer') {
      return this.prisma.user.upsert({
        where: { wallet: wallet },
        update: {},
        create: { wallet },
      });
    }

    if (userType === 'merchant') {
      return this.prisma.merchant.upsert({
        where: { wallet: wallet },
        update: {},
        create: {
          wallet,
          businessName: 'Unnamed Merchant',
        },
      });
    }

    throw new Error('Invalid user type');
  }
}
