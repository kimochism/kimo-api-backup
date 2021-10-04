import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerBagDocument = CustomerBag & Document;

@Schema({ timestamps: true })
export class CustomerBag {
  
  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Object, required: true })
  options: {
    size: string;
    color: string;
  };

  @Prop({ type: String, required: true })
  customer: string;

  @Prop({ type: String, required: true })
  product: string;
}

export const CustomerBagSchema = SchemaFactory.createForClass(CustomerBag);
