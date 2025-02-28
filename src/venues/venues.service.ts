import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Venue } from './venue.schema';

@Injectable()
export class VenuesService {
  constructor(@InjectModel(Venue.name) private venueModel: Model<Venue>) {}

  async create(venueDto: any) {
    const venue = new this.venueModel(venueDto);
    return await venue.save();
  }

  async findAll() {
    return this.venueModel.find().exec();
  }

  async update(id: string, venueDto: any) {
    return this.venueModel.findByIdAndUpdate(id, venueDto, { new: true });
  }

  async delete(id: string) {
    return this.venueModel.findByIdAndDelete(id);
  }
}