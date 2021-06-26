import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  
  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: Boolean, required: false })
  sent: boolean;

  @Prop({ type: Boolean, required: false })
  delivered: boolean;

  @Prop({ type: Number, required: false })
  amount: number;

  @Prop({ type: Number, required: false })
  freight: number;

  @Prop({ type: String, required: false })
  customer_id: string;

  @Prop({ type: Array, required: false })
  products: string[]

}

export const OrderSchema = SchemaFactory.createForClass(Order);
