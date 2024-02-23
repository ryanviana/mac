import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Announcer {
  @ApiProperty({
    description: 'Unique identifier',
    example: '507f1f77bcf86cd799439011',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ description: 'Razão Social', example: 'XYZ Corp' })
  @Prop({ required: true })
  razaoSocial: string;

  @ApiProperty({ description: 'Quantidade de Anúncios Feitos', example: 100 })
  @Prop({ required: true, type: Number })
  quantidadeAnunciosFeitos: number;

  @ApiProperty({ description: 'Stars rating', example: 4.5, type: 'number' })
  @Prop({ required: true, type: mongoose.Schema.Types.Decimal128 })
  stars: number;

  @ApiProperty({
    description: 'Link to announcer profile',
    example: 'https://example.com/announcer',
  })
  @Prop({ required: true })
  link: string;

  @ApiProperty({
    description: 'Email of the announcer',
    example: 'announcer@example.com',
  })
  @Prop({ required: true })
  email: string;

  @ApiProperty({
    description: 'Wallet address of the announcer',
    example: '0xABC123...',
  })
  @Prop({ required: true })
  walletAddress: string;
}

export const AnnouncerSchema = SchemaFactory.createForClass(Announcer);
export type AnnouncerDocument = Announcer & mongoose.Document;
