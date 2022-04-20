import { requestError, requestSuccess } from '@/util/response';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import {
  AuthForgotPasswordDto,
  AuthLoginDto,
  AuthResetPasswordDto,
} from './entity/auth.entity';
import GoogleAuthGuard from './guards/google.guard';
import JwtAccessAuthGuard from './guards/jwt-access-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() input: AuthLoginDto, @Res() res: Response) {
    this.authService
      .login(input)
      .then(requestSuccess(res))
      .catch(requestError(res));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessAuthGuard)
  @Put('/reset-password')
  async resetPassword(
    @Body() input: AuthResetPasswordDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    this.authService
      .resetPassword(req, input)
      .then(requestSuccess(res))
      .catch(requestError(res));
  }

  @Post('/forgot-password')
  async forgotPassword(
    @Body() input: AuthForgotPasswordDto,
    @Res() res: Response,
  ) {
    this.authService
      .forgotPassword(input)
      .then(requestSuccess(res))
      .catch(requestError(res));
  }

  @Get('auth/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {
    
  }


  @Get('auth/google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    this.authService
      .googleLogin(req)
      .then(requestSuccess(res))
      .catch(requestError(res));
  }
}
