import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Creator {
  @ApiProperty({
    description: 'Unique identifier',
    example: '507f1f77bcf86cd799439011',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ description: 'Name of the creator', example: 'John Doe' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'Biography of the creator',
    example: 'John is a content creator...',
  })
  @Prop({ required: true })
  biography: string;

  @ApiProperty({ description: 'Occupation of the creator', example: 'Blogger' })
  @Prop({ required: true })
  occupation: string;

  @ApiProperty({
    description: 'Target audience of the creator',
    example: 'Tech enthusiasts',
  })
  @Prop({ required: true })
  targetAudience: string;

  @ApiProperty({ description: 'Stars rating', example: 4.5, type: 'number' })
  @Prop({ required: true, type: mongoose.Schema.Types.Decimal128 })
  stars: number;

  @ApiProperty({
    description: 'Link to creator profile',
    example: 'https://example.com/creator',
  })
  @Prop({ required: true })
  link: string;

  @ApiProperty({
    description: 'Email of the creator',
    example: 'creator@example.com',
  })
  @Prop({ required: true })
  email: string;

  @ApiProperty({
    description: 'Cost per thousand impressions (CPM)',
    example: 15.5,
    type: 'number',
  })
  @Prop({ required: true, type: mongoose.Schema.Types.Decimal128 })
  CPM: number;

  @ApiProperty({
    description: 'Wallet address of the creator',
    example: '0xABC123...',
  })
  @Prop({ required: true })
  walletAddress: string;

  @ApiProperty({
    description: 'Payment token of the creator',
    example: 'BTC',
  })
  @Prop({ required: true })
  paymentToken: string;
}

export const CreatorSchema = SchemaFactory.createForClass(Creator);
export type CreatorDocument = Creator & Document;
