import { requestError, requestSuccess } from '@/util/response';
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { MailService } from './mail.service';
import { Roles } from '@/modules/auth/decorators/roles.decorator';
import { UserRole } from '@/modules/user/enum';
import JwtAccessAuthGuard from '@/modules/auth/guards/jwt-access-auth.guard';
import { RolesGuard } from '@/modules/auth/guards/role.guard';
import { Mail, SendMailDto } from './entity/mail.entity';

@ApiTags('Mail')
@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAccessAuthGuard, RolesGuard)
  @Post('/send')
  async login(
    @Body() input: SendMailDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    this.mailService
      .sendMailToUser(req, input)
      .then(requestSuccess(res))
      .catch(requestError(res));
  }
}
