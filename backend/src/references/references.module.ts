import { Module } from '@nestjs/common';
import { ReferencesController } from './references.controller';
import { ReferencesService } from './references.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reference, ReferenceSchema } from './references.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reference.name, schema: ReferenceSchema },
    ]),
  ],
  controllers: [ReferencesController],
  providers: [ReferencesService],
  exports: [ReferencesService],
})
export class ReferencesModule {}
