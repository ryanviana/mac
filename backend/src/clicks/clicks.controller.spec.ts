import { Test, TestingModule } from '@nestjs/testing';
import { ClicksController } from './clicks.controller';
import { ClicksService } from './clicks.service';

describe('LinksController', () => {
  let controller: ClicksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClicksController],
      providers: [ClicksService],
    }).compile();

    controller = module.get<ClicksController>(ClicksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
