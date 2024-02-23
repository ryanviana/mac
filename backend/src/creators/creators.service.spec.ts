import { Test, TestingModule } from '@nestjs/testing';
import { CreatorsService } from './creators.service';

describe('CreatorsService', () => {
  let service: CreatorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatorsService],
    }).compile();

    service = module.get<CreatorsService>(CreatorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
