import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Announcement, AnnouncementDocument } from './announcements.schema';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { CounterService } from 'src/counter/counter.service';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectModel(Announcement.name)
    private announcementModel: Model<AnnouncementDocument>,
    private counterService: CounterService,
  ) {}
  async create(createAnnouncementDto: CreateAnnouncementDto) {
    const blockchainAdsId =
      await this.counterService.getNextSequence('blockchainAdsId');
    const createdAnnouncement = new this.announcementModel({
      ...createAnnouncementDto,
      blockchainAdsId,
    });
    return createdAnnouncement.save();
  }
  async findAll() {
    return this.announcementModel.find().exec();
  }
  async findOne(id: string) {
    return this.announcementModel.findById(id).exec();
  }
  async update(
    id: string,
    updateAnnouncementDto: UpdateAnnouncementDto,
  ): Promise<Announcement> {
    return this.announcementModel
      .findByIdAndUpdate(id, updateAnnouncementDto, {
        new: true,
      })
      .exec();
  }
  remove(id: string) {
    return this.announcementModel.findByIdAndDelete(id).exec();
  }
}
