import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Click {
  @ApiProperty({
    description: 'Unique identifier',
    example: '507f1f77bcf86cd799439011',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ description: 'Reference', example: '/reference123' })
  @Prop({ required: true })
  reference: string;

  @ApiProperty({ description: 'IP Address', example: '192.168.1.1' })
  @Prop({ required: true })
  ip: string;

  @ApiProperty({ description: 'Paid status', example: false })
  @Prop({ default: false })
  paid: boolean;

  @ApiProperty({ description: 'Payment token', example: 'BTC' })
  @Prop({ required: true })
  paymentToken: string;

  @ApiProperty({ description: 'Proposal ID', example: '123' })
  @Prop({ required: true })
  proposalId: number;
}

export const ClickSchema = SchemaFactory.createForClass(Click);
export type ClickDocument = Click & Document;
