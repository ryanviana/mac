import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Announcement {
  @ApiProperty({
    description: 'Unique identifier',
    example: '507f1f77bcf86cd799439011',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    description: 'Description of the announcement',
    example: 'New product launch',
  })
  @Prop({ required: true })
  descricao: string;

  @ApiProperty({ description: 'Unique token', example: '12345' })
  @Prop({ required: true })
  token: string;

  @ApiProperty({
    description: 'Cost per thousand impressions',
    example: 20.5,
    type: 'number',
  })
  @Prop({ required: true, type: mongoose.Schema.Types.Decimal128 })
  CPM: number;

  @ApiProperty({ description: 'Advertiser', example: 'Advertiser Inc.' })
  @Prop({ required: true })
  anunciante: string;

  @ApiProperty({ description: 'Content creator', example: 'Creator X' })
  @Prop({ required: true })
  criadorConteudo: string;

  @ApiProperty({ description: 'Status of the announcement', example: 'Active' })
  @Prop({ required: true })
  status: string;

  @ApiProperty({ description: 'Completion status', example: false })
  @Prop({ required: true })
  concluido: boolean;

  @ApiProperty({
    description: 'Parameterized link',
    example: 'https://example.com?ref=123',
  })
  @Prop({ required: true })
  linkParametrizado: string;

  @ApiProperty({ description: 'Proposal Id', example: 'SN123456' })
  @Prop({ required: true })
  proposalId: number;

  @ApiProperty({
    description: 'Total amount to be paid',
    example: 200.5,
  })
  @Prop({ required: true })
  totalAmount: number;

  @ApiProperty({
    description: 'Wallet Address of the Advertiser',
    example: '0x1234567890',
  })
  @Prop({ required: true })
  advertiserWalletAddress: string;

  @ApiProperty({
    description: 'Wallet Address of the Content Creator',
    example: '0x1234567890',
  })
  @Prop({ required: true })
  creatorWalletAddress: string;

  @ApiProperty({
    description:
      'Clicks milestone to be completed. Each clicks milestone the creator is paid.',
    example: 1000,
  })
  @Prop({ required: true })
  milestone: number;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);
export type AnnouncementDocument = Announcement & mongoose.Document;
