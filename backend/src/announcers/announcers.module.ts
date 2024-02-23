import { Module } from '@nestjs/common';
import { AnnouncersService } from './announcers.service';
import { AnnouncersController } from './announcers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Announcer, AnnouncerSchema } from './announcers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Announcer.name, schema: AnnouncerSchema },
    ]),
  ],
  controllers: [AnnouncersController],
  providers: [AnnouncersService],
  exports: [AnnouncersService],
})
export class AnnouncersModule {}
