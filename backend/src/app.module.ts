import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreatorsModule } from './creators/creators.module';
import { AnnouncersModule } from './announcers/announcers.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { Announcer, AnnouncerSchema } from './announcers/announcers.schema';
import { Creator, CreatorSchema } from './creators/creators.schema';
import {
  Announcement,
  AnnouncementSchema,
} from './announcements/announcements.schema';
import { CreatorsController } from './creators/creators.controller';
import { AnnouncersController } from './announcers/announcers.controller';
import { AnnouncementsController } from './announcements/announcements.controller';
import { CreatorsService } from './creators/creators.service';
import { AnnouncersService } from './announcers/announcers.service';
import { AnnouncementsService } from './announcements/announcements.service';
import { LinksModule } from './clicks/clicks.module';
import { ReferencesModule } from './references/references.module';
import { TokensModule } from './tokens/tokens.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Counter, CounterSchema } from './counter/counter.schema';
import { CounterController } from './counter/counter.controller';
import { CounterService } from './counter/counter.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rgb:admin@nodeexpress.ps2xp1a.mongodb.net/?retryWrites=true&w=majority',
      { dbName: 'MAC' },
    ),
    MongooseModule.forFeature([
      { name: Announcer.name, schema: AnnouncerSchema },
    ]),
    MongooseModule.forFeature([{ name: Creator.name, schema: CreatorSchema }]),
    MongooseModule.forFeature([
      { name: Announcement.name, schema: AnnouncementSchema },
    ]),
    MongooseModule.forFeature([{ name: Counter.name, schema: CounterSchema }]),
    CreatorsModule,
    AnnouncersModule,
    AnnouncementsModule,
    LinksModule,
    ReferencesModule,
    TokensModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
  ],
  controllers: [
    AppController,
    CreatorsController,
    AnnouncersController,
    AnnouncementsController,
    CounterController,
  ],
  providers: [
    AppService,
    CreatorsService,
    AnnouncersService,
    AnnouncementsService,
    CounterService,
  ],
})
export class AppModule {}
