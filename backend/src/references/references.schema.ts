import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Reference {
  @ApiProperty({
    description: 'Unique identifier',
    example: '507f1f77bcf86cd799439011',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    description: 'Announcement identifier',
    example: '507f1f77bcf86cd799439011',
  })
  @Prop({ required: true })
  announcementId: string;

  @ApiProperty({
    description: 'Link associated with the reference',
    example: 'https://example.com',
  })
  @Prop({ required: true })
  link: string;

  @ApiProperty({
    description: 'Reference identifier',
    example: '/reference123',
  })
  @Prop({ required: true })
  reference: string;

  @ApiProperty({
    description: 'Is the reference active?',
    example: 'true',
  })
  @Prop({ required: true })
  active: boolean;
}

export const ReferenceSchema = SchemaFactory.createForClass(Reference);
export type ReferenceDocument = Reference & Document;
