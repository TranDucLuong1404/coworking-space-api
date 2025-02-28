import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Venue {
  _id: Types.ObjectId; // Định nghĩa rõ ràng kiểu của _id

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  capacity: number;
}

export type VenueDocument = Venue & Document;
export const VenueSchema = SchemaFactory.createForClass(Venue);
