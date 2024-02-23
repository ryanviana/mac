import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAnnouncerDto } from './dto/create-announcer.dto';
import { UpdateAnnouncerDto } from './dto/update-announcer.dto';
import { Announcer, AnnouncerDocument } from './announcers.schema';

@Injectable()
export class AnnouncersService {
  constructor(
    @InjectModel(Announcer.name)
    private announcerModel: Model<AnnouncerDocument>,
  ) {}
  async create(createAnnouncerDto: CreateAnnouncerDto) {
    const newAnnouncer = new this.announcerModel(createAnnouncerDto);
    return newAnnouncer.save();
  }
  async findAll() {
    return this.announcerModel.find().exec();
  }
  async findOne(id: string) {
    return this.announcerModel.findById(id).exec();
  }
  async update(
    id: string,
    updateAnnouncerDto: UpdateAnnouncerDto,
  ): Promise<Announcer> {
    return this.announcerModel
      .findByIdAndUpdate(id, updateAnnouncerDto, { new: true })
      .exec();
  }
  remove(id: string) {
    return this.announcerModel.findByIdAndDelete(id).exec();
  }
}
