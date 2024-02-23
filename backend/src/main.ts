import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { createWriteStream } from 'fs';
import { get } from 'http';
import { Announcement } from './announcements/announcements.schema';
import { Announcer } from './announcers/announcers.schema';
import { AppModule } from './app.module';
import { Click } from './clicks/clicks.schema';
import { Creator } from './creators/creators.schema';
import { Reference } from './references/references.schema';

async function bootstrap() {
  const cors = require('cors');
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('MAC API')
    .setDescription('APIs for MAC application.')
    .setVersion('1.0')
    .addTag('mac')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [Announcement, Creator, Announcer, Click, Reference],
  });
  SwaggerModule.setup('swagger', app, document, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
  });
  app.use(cors());
  dotenv.config();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
