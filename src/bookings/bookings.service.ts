import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './booking.schema';

@Injectable()
export class BookingsService {
  constructor(@InjectModel(Booking.name) private bookingModel: Model<Booking>) {}

  async createBooking(userId: string, venueId: string, date: Date, time: string) {
    const isAvailable = await this.checkAvailability(venueId, date, time);
    if (!isAvailable) throw new BadRequestException('Venue not available');
    const booking = new this.bookingModel({ userId, venueId, date, time, status: 'pending' });
    return await booking.save();
  }

  async getBookings(user: any) {
    if (user.role === 'admin') return this.bookingModel.find().exec();
    return this.bookingModel.find({ userId: user.userId }).exec();
  }

  async cancelBooking(bookingId: string, user: any) {
    const booking = await this.bookingModel.findById(bookingId);
    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.userId.toString() !== user.userId && user.role !== 'admin')
      throw new UnauthorizedException('Not authorized');
    booking.status = 'cancelled';
    return await booking.save();
  }

  async updateStatus(bookingId: string, status: string) {
    const booking = await this.bookingModel.findById(bookingId);
    if (!booking) throw new NotFoundException('Booking not found');
    booking.status = status;
    return await booking.save();
  }

  async checkAvailability(venueId: string, date: Date, time: string) {
    const existingBookings = await this.bookingModel.find({
      venueId,
      date,
      time,
      status: { $ne: 'cancelled' },
    });
    return existingBookings.length === 0;
  }
}