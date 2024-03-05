import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CounterModule } from 'src/counter/counter.module';
import { AnnouncementsController } from './announcements.controller';
import { Announcement, AnnouncementSchema } from './announcements.schema';
import { AnnouncementsService } from './announcements.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Announcement.name, schema: AnnouncementSchema },
    ]),
    CounterModule,
  ],
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService],
  exports: [AnnouncementsService],
})
export class AnnouncementsModule {}
