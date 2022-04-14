import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = app.get(ConfigService).get<number>('PORT');
  console.log({ PORT });

  await app.listen(PORT || 3000);
}
bootstrap();
