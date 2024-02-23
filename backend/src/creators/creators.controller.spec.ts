import { Test, TestingModule } from '@nestjs/testing';
import { CreatorsController } from './creators.controller';
import { CreatorsService } from './creators.service';

describe('CreatorsController', () => {
  let controller: CreatorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatorsController],
      providers: [CreatorsService],
    }).compile();

    controller = module.get<CreatorsController>(CreatorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
