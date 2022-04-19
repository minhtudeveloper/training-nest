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
import { UserLoginDto, UserResetPasswordDto } from './entity/auth.entity';
import JwtAccessAuthGuard from './guards/jwt-access-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() inputLogin: UserLoginDto, @Res() res: Response) {
    this.authService
      .login(inputLogin)
      .then(requestSuccess(res))
      .catch(requestError(res));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessAuthGuard)
  @Put('/reset-password')
  async resetPassword(
    @Body() inputLogin: UserResetPasswordDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    this.authService
      .resetPassword(req, inputLogin)
      .then(requestSuccess(res))
      .catch(requestError(res));
  }
}
