import { Test, TestingModule } from '@nestjs/testing';
import { ClicksService } from './clicks.service';

describe('ClicksService', () => {
  let service: ClicksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClicksService],
    }).compile();

    service = module.get<ClicksService>(ClicksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
