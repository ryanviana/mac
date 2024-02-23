import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Token {
  @ApiProperty({
    description: 'Unique identifier',
    example: '507f1f77bcf86cd799439011',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    description: 'Token name',
    example: 'Bitcoin',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'Token short name',
    example: 'BTC',
  })
  @Prop({ required: true })
  shortName: string;

  @ApiProperty({
    description: 'Token symbol',
    example: '1',
  })
  @Prop({ required: true })
  macIndex: number;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
export type TokenDocument = Token & Document;
