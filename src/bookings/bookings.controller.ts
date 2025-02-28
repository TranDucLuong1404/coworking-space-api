import { Controller, Post, Get, Delete, Patch, Param, Body, UseGuards, Request, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/admin.guard';
import { BookingsService } from './bookings.service';
import { VenuesService } from '../venues/venues.service';
import { Venue, VenueDocument } from '../venues/venue.schema'; // Import Venue và VenueDocument
import { Types } from 'mongoose';

interface VenueResponse {
  _id: string;
  name?: string;
  description?: string;
  capacity?: number;
}

@Controller('bookings')
@UseGuards(AuthGuard('jwt'))
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly venuesService: VenuesService,
  ) {}

  @Post()
  async create(@Request() req, @Body() body: { venueId: string; date: string; time: string }) {
    return this.bookingsService.createBooking(req.user.userId, body.venueId, new Date(body.date), body.time);
  }

  @Get()
  async findAll(@Request() req) {
    return this.bookingsService.getBookings(req.user);
  }

  @Delete(':id')
  async cancel(@Param('id') id: string, @Request() req) {
    return this.bookingsService.cancelBooking(id, req.user);
  }

  @Patch(':id/status')
  @UseGuards(AdminGuard)
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.bookingsService.updateStatus(id, status);
  }

  @Get('availability')
  async checkAvailability(@Query('date') date: string, @Query('time') time: string) {
    const venues: VenueDocument[] = await this.venuesService.findAll(); // Sử dụng VenueDocument
    const availableVenues: VenueResponse[] = [];

    for (const venue of venues) {
      const isAvailable = await this.bookingsService.checkAvailability(
        venue._id.toString(), // Chuyển ObjectId thành string
        new Date(date),
        time,
      );
      if (isAvailable) {
        availableVenues.push({
          _id: venue._id.toString(), // Không còn lỗi Type 'string' is not assignable to type 'ObjectId'
          name: venue.name,
          description: venue.description,
          capacity: venue.capacity,
        });
      }
    }
    return availableVenues;
  }
}
