import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerBagDocument = CustomerBag & Document;

@Schema({ timestamps: true })
export class CustomerBag {
  
  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: String, required: true })
  customer_id: string;

  @Prop({ type: String, required: true })
  product_id: string;
}

export const CustomerBagSchema = SchemaFactory.createForClass(CustomerBag);
