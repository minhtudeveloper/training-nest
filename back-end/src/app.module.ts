import { Module } from '@nestjs/common';
import { Modules } from './modules';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Environment } from '@/config/environment';
import { MongoService } from '@/config/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Environment],
    }),
    TypeOrmModule.forRootAsync({
      useClass: MongoService,
    }),
    Modules,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
