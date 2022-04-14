import { Module } from '@nestjs/common';
import { Modules } from './modules';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormService } from '@/typeorm/typeorm.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModules } from './modules/user/user.module';
import { Connection } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
    UserModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
