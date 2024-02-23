import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReferenceDto } from './dto/create-reference.dto';
import { UpdateReferenceDto } from './dto/update-reference.dto';
import { Reference, ReferenceDocument } from './references.schema';

@Injectable()
export class ReferencesService {
  constructor(
    @InjectModel(Reference.name)
    private referenceModel: Model<ReferenceDocument>,
  ) {}

  async create(createReferenceDto: CreateReferenceDto): Promise<Reference> {
    const newReference = new this.referenceModel(createReferenceDto);
    return newReference.save();
  }

  async findAll(): Promise<Reference[]> {
    return this.referenceModel.find().exec();
  }

  async findOne(id: string): Promise<Reference> {
    return this.referenceModel.findById(id).exec();
  }

  async update(
    id: string,
    updateReferenceDto: UpdateReferenceDto,
  ): Promise<Reference> {
    return this.referenceModel
      .findByIdAndUpdate(id, updateReferenceDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Reference> {
    return this.referenceModel.findByIdAndDelete(id).exec();
  }

  async getLinkByReference(reference: string): Promise<string> {
    const result = await this.referenceModel
      .findOne({ reference: reference })
      .select('link')
      .exec();

    return result ? result.link : null;
  }

  async getActiveReferences(): Promise<Reference[]> {
    return this.referenceModel.find({ active: true }).exec();
  }

  async checkReferenceExists(reference: string): Promise<boolean> {
    const result = await this.referenceModel
      .findOne({ reference: reference })
      .exec();

    return result ? true : false;
  }

  async getReferenceByReference(reference: string): Promise<Reference> {
    return this.referenceModel.findOne({ reference: '/' + reference }).exec();
  }
}
