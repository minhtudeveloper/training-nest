import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from './user.service';
import { requestSuccess, requestError } from '@/util/response';
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  UserChangePasswordDto,
  UserCreateDto,
  UserDeleteDto,
  UserUpdateDto,
} from './entity/user.entity';
import { Roles } from '@/modules/auth/decorators/roles.decorator';
import { RolesGuard } from '@/modules/auth/guards/role.guard';
import JwtAccessAuthGuard from '@/modules/auth/guards/jwt-access-auth.guard';
import { UserRole, UserStatus } from './enum';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAccessAuthGuard, RolesGuard)
  @Get('')
  async getUser(@Res() res: Response) {
    this.userService
      .getUser()
      .then(requestSuccess(res))
      .catch(requestError(res));
  }

  @Post('')
  async createUser(@Body() input: UserCreateDto, @Res() res: Response) {
    this.userService
      .createUser(input)
      .then(requestSuccess(res))
      .catch(requestError(res));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessAuthGuard)
  @Put('/change-password')
  async changePassword(
    @Body() input: UserChangePasswordDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    this.userService
      .changePassword(req, input)
      .then(requestSuccess(res))
      .catch(requestError(res));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessAuthGuard)
  @Put('')
  async updateUser(
    @Body() input: UserUpdateDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    this.userService
      .updateUser(req, input)
      .then(requestSuccess(res))
      .catch(requestError(res));
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAccessAuthGuard, RolesGuard)
  @Delete('')
  async deleteUser(
    @Body() input: UserDeleteDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    this.userService
      .deleteUser(input)
      .then(requestSuccess(res))
      .catch(requestError(res));
  }
}
