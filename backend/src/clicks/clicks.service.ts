import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLinkDto as CreateClickDto } from './dto/create-click.dto';
import { UpdateLinkDto as UpdateClickDto } from './dto/update-click.dto';
import { Click, ClickDocument } from './clicks.schema';
import { UnpaidClicksResponseDto } from './dto/count-click.dto';
import { ClickCountDto } from './dto/count-click-proposal-dto';

@Injectable()
export class ClicksService {
  constructor(
    @InjectModel(Click.name) private clickModel: Model<ClickDocument>,
  ) {}

  async create(createClickDto: CreateClickDto): Promise<Click> {
    const newCreator = new this.clickModel(createClickDto);
    return newCreator.save();
  }

  async findAll(): Promise<Click[]> {
    return this.clickModel.find().exec();
  }

  async findOne(id: string): Promise<Click> {
    return this.clickModel.findById(id).exec();
  }

  async update(id: string, updateClickDto: UpdateClickDto): Promise<Click> {
    return this.clickModel
      .findByIdAndUpdate(id, updateClickDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Click> {
    return this.clickModel.findByIdAndDelete(id).exec();
  }

  async hasAtLeastThousandUnpaidClicks(
    reference: string,
  ): Promise<UnpaidClicksResponseDto> {
    const count = await this.clickModel
      .countDocuments({ reference: reference, paid: false })
      .exec();
    return {
      hasAtLeastThousandUnpaidClicks: count >= 1000,
      unpaidClicksCount: count,
      message:
        count >= 1000
          ? 'There are at least 1000 unpaid clicks'
          : 'There are less than 1000 unpaid clicks',
    };
  }

  async markAllClicksAsPaid(): Promise<{ updatedCount: number }> {
    const result = await this.clickModel.updateMany(
      { paid: false },
      { $set: { paid: true } },
    );

    return { updatedCount: result.modifiedCount };
  }

  async checkIfIpAlreadyClicked(
    ip: string,
    reference: string,
  ): Promise<boolean> {
    const count = await this.clickModel
      .countDocuments({ reference: reference, ip: ip })
      .exec();
    return count > 0;
  }

  async countClicksByProposalId(proposalId: number): Promise<ClickCountDto> {
    const count = await this.clickModel
      .countDocuments({ proposalId: proposalId })
      .exec();
    return {
      clicks: count,
      proposalId: proposalId,
    };
  }
}
