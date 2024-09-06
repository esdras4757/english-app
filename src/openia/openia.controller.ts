import { Controller,Get, Param, Post,Body } from '@nestjs/common';
import { OpeniaService } from './openia.service';

@Controller('openia')
export class OpeniaController {
    
      constructor(private readonly openiaService: OpeniaService) {
     console.log('OpeniaController constructor');
      }

    @Post('/completions')
    async makeCompletion(@Body('inputValue') text: string) {
        console.log(await this.openiaService.createMessage(text));
        return await this.openiaService.createMessage(text);
    }

}
