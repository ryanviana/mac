import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Token, TokenDocument } from './tokens.schema';
@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token.name)
    private tokenModel: Model<TokenDocument>,
  ) {}

  async create(createTokenDto: CreateTokenDto): Promise<Token> {
    const newToken = new this.tokenModel(createTokenDto);
    return newToken.save();
  }

  async findAll(): Promise<Token[]> {
    return this.tokenModel.find().exec();
  }

  async findOne(id: string): Promise<Token> {
    return this.tokenModel.findById(id).exec();
  }

  async update(id: string, updateTokenDto: UpdateTokenDto): Promise<Token> {
    return this.tokenModel
      .findByIdAndUpdate(id, updateTokenDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Token> {
    return this.tokenModel.findByIdAndDelete(id).exec();
  }
}
