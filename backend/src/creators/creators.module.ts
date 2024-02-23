import { Module } from '@nestjs/common';
import { CreatorsController } from './creators.controller';
import { CreatorsService } from './creators.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Creator, CreatorSchema } from './creators.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Creator.name, schema: CreatorSchema }]),
  ],
  controllers: [CreatorsController],
  providers: [CreatorsService],
  exports: [CreatorsService],
})
export class CreatorsModule {}
