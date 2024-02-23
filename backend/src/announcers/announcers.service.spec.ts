import { Test, TestingModule } from '@nestjs/testing';
import { AnnouncersService } from './announcers.service';

describe('AnnouncersService', () => {
  let service: AnnouncersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnnouncersService],
    }).compile();

    service = module.get<AnnouncersService>(AnnouncersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
