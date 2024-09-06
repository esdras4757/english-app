import { Test, TestingModule } from '@nestjs/testing';
import { OpeniaController } from './openia.controller';
import { OpeniaService } from './openia.service';

describe('OpeniaController', () => {
  let openiaController: OpeniaController;
  let openiaService: OpeniaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpeniaController],
      providers: [OpeniaService],
    }).compile();

    openiaService = module.get<OpeniaService>(OpeniaService);
    openiaController = module.get<OpeniaController>(OpeniaController);
  });

  describe('getHello', () => {
    it('should return "Hello from OpenIA!"', () => {
      const result = 'Hello from OpenIA!';
      jest.spyOn(openiaService, 'getHello').mockImplementation(() => result);

      expect(openiaController.getHello()).toBe(result);
    });
  });
});
