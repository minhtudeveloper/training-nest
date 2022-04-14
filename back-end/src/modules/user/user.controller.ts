import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { Response } from 'express';
import { InjectConnection } from '@nestjs/typeorm';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getUser(@Res() res: Response) {
  }

  @Post('')
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    console.log('post create user');
    

    return await this.userService.createUser(createUserDto)
  }
}
