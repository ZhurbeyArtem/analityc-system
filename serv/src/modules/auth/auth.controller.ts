import { Body, Controller, Post, Put } from '@nestjs/common';
import { UserBaseDto } from '../user/user.dto';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { RefreshTokenDto } from './refresh-token/refresh-token.dto';
import { ConfirmEmailService } from './confirm-email/confirm-email.service';
import { ConfirmEmailDto } from './confirm-email/confirm-email.dto';
import { ResendCodeDto } from './resend-code/resend-code.dto';
import { ResendCodeService } from './resend-code/resend-code.service';

@Controller('auth')
export class AuthController {
  constructor(
    private loginService: LoginService,
    private registerService: RegisterService,
    private refreshTokenService: RefreshTokenService,
    private confirmEmailService: ConfirmEmailService,
    private resendCodeService: ResendCodeService,
  ) { }

  @Post('login')
  login(@Body() data: UserBaseDto) {
    return this.loginService.login(data);
  }

  @Post('register')
  register(@Body() data: UserBaseDto) {
    return this.registerService.register(data);
  }

  @Post('refresh')
  refreshTokens(@Body() data: RefreshTokenDto) {
    return this.refreshTokenService.refresh(data.refreshToken);
  }

  @Post('confirmEmail')
  confirmEmail(@Body() data: ConfirmEmailDto) {
    return this.confirmEmailService.confirm(data);
  }

  @Put('resendCode')
  resendCode(@Body() data: ResendCodeDto) {
    return this.resendCodeService.resendCode(data);
  }
}
