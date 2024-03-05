import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Counter {
  @ApiProperty({
    description: 'Unique identifier',
    example: '507f1f77bcf86cd799439011',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ description: 'seq of the counter', example: '1000' })
  @Prop({ required: true })
  seq: number;

  @ApiProperty({
    description: 'name of the counter',
    example: 'blockchainAdsId',
  })
  @Prop({ required: true })
  name: string;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
export type CounterDocument = Counter & Document;
