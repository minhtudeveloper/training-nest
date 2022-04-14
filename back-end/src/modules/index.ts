import { Module } from '@nestjs/common';
import { UserModules } from './user/user.module';

@Module({
  imports: [
    UserModules
  ],
  exports:[
    UserModules
  ]
})
export class Modules {}
