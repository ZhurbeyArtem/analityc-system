import { forwardRef, Module } from '@nestjs/common';
import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { ConfirmEmailService } from './confirm-email/confirm-email.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  providers: [
    RegisterService,
    LoginService,
    RefreshTokenService,
    ConfirmEmailService,
  ],
  controllers: [AuthController],
  exports: [RegisterService, LoginService, JwtModule],
})
export class AuthModule {}
