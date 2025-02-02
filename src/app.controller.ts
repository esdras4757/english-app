import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Get()
  getHello(): string {
    return `
      <form action="openia/completions" method="post">
        <input type="text" name="inputValue" />
        <button type="submit">Enviar</button>
      </form>
    `;
  }
}
