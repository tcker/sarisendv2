import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MerchantModule } from './merchant/merchant.module';
import { MerchantController } from './merchant/merchant.controller';

@Module({
  imports: [AuthModule, MerchantModule],
  controllers: [AppController, MerchantController],
  providers: [AppService],
})
export class AppModule {}
