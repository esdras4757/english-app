import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OpeniaModule } from './openia/openia.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
