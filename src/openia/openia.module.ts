import { Module } from '@nestjs/common';
import { OpeniaController } from './openia.controller';
import { OpeniaService } from './openia.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [OpeniaController],
  providers: [OpeniaService]
})
export class OpeniaModule {}
