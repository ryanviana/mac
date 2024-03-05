import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';

@Injectable()
export class CounterService {
  constructor(@InjectModel('Counter') private counterModel: Model<any>) {}

  async create(createCounterDto: CreateCounterDto) {
    const createdCounter = new this.counterModel(createCounterDto);
    return await createdCounter.save();
  }

  async findAll() {
    return await this.counterModel.find().exec();
  }

  async findOne(id: string) {
    return await this.counterModel.findById(id).exec();
  }

  async update(id: string, updateCounterDto: UpdateCounterDto) {
    return await this.counterModel
      .findByIdAndUpdate(id, updateCounterDto, { new: true })
      .exec();
  }

  async findOneAndUpdate(id: string, sequenceValue: number) {
    return await this.counterModel
      .findOneAndUpdate(
        { _id: id },
        { $set: { seq: sequenceValue } },
        { new: true, upsert: true },
      )
      .exec();
  }

  async getNextSequence(seqName: string): Promise<number> {
    const counter = await this.counterModel.findOneAndUpdate(
      { name: seqName },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );
    return counter.seq;
  }
}
