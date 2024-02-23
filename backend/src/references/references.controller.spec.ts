import { Test, TestingModule } from '@nestjs/testing';
import { ReferencesController } from './references.controller';
import { ReferencesService } from './references.service';

describe('ReferencesController', () => {
  let controller: ReferencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReferencesController],
      providers: [ReferencesService],
    }).compile();

    controller = module.get<ReferencesController>(ReferencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
