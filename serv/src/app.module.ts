import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { DermacheModule } from './modules/dermache/dermache.module';
import { NotificationModule } from './modules/notification/notification.module';


@Module({
  imports: [
    CommonModule,
    AuthModule,
    UserModule,
    PortfolioModule,
    DermacheModule,
    NotificationModule,

  ],
})
export class AppModule {}
