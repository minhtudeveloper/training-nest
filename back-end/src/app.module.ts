import { Module } from '@nestjs/common';
import { Modules } from './modules';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormService } from '@/typeorm/typeorm.service';
import { Connection } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
    Modules,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
