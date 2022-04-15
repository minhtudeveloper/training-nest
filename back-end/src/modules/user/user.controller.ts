import { Body, Controller, Get, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { requestSuccess, requestError } from '@/util/response';
import { ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from './entity/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getUser(@Res() res: Response) {
    this.userService
      .getUser()
      .then(requestSuccess(res))
      .catch(requestError(res));
  }

  @Post('')
  async createUser(@Body() createUserDto: UserCreateDto, @Res() res: Response) {
    this.userService
      .createUser(createUserDto)
      .then(requestSuccess(res))
      .catch(requestError(res));
  }

  @Put('/change-password')
  async changePassword(
    @Body() createUserDto: UserCreateDto,
    @Res() res: Response,
  ) {
    this.userService
      .createUser(createUserDto)
      .then(requestSuccess(res))
      .catch(requestError(res));
  }
}
