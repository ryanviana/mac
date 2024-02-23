import { Test, TestingModule } from '@nestjs/testing';
import { AnnouncersController } from './announcers.controller';
import { AnnouncersService } from './announcers.service';

describe('AnnouncersController', () => {
  let controller: AnnouncersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnouncersController],
      providers: [AnnouncersService],
    }).compile();

    controller = module.get<AnnouncersController>(AnnouncersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
