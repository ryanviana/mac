import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { Creator, CreatorDocument } from './creators.schema';

@Injectable()
export class CreatorsService {
  constructor(
    @InjectModel(Creator.name) private creatorModel: Model<CreatorDocument>,
  ) {}

  async create(createCreatorDto: CreateCreatorDto): Promise<Creator> {
    const newCreator = new this.creatorModel(createCreatorDto);
    return newCreator.save();
  }

  async findAll(): Promise<Creator[]> {
    return this.creatorModel.find().exec();
  }

  async findOne(id: string): Promise<Creator> {
    return this.creatorModel.findById(id).exec();
  }

  async update(
    id: string,
    updateCreatorDto: UpdateCreatorDto,
  ): Promise<Creator> {
    return this.creatorModel
      .findByIdAndUpdate(id, updateCreatorDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Creator> {
    return this.creatorModel.findByIdAndDelete(id).exec();
  }
}
