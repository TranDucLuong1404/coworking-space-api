import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VenuesService } from './venues.service';
import { VenuesController } from './venues.controller';
import { Venue, VenueSchema } from './venue.schema'; // Import Venue model

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Venue.name, schema: VenueSchema }]), // Đăng ký model Venue
  ],
  providers: [VenuesService],
  controllers: [VenuesController],
  exports: [VenuesService], // Xuất để module khác có thể dùng
})
export class VenuesModule {}
