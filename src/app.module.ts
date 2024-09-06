import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpeniaModule } from './openia/openia.module';

@Module({
  imports: [OpeniaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
