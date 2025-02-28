import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking, BookingSchema } from './booking.schema'; // Import Booking model
import { VenuesModule } from '../venues/venues.module'; // Import VenuesModule để sử dụng VenuesService

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]), // 💡 Đăng ký model Booking
    VenuesModule, // 💡 Import VenuesModule để sử dụng VenuesService
  ],
  providers: [BookingsService],
  controllers: [BookingsController],
  exports: [BookingsService], // Xuất nếu module khác cần sử dụng
})
export class BookingsModule {}
