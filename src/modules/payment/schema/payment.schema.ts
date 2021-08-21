import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  
  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: Number, required: true })
  amount: number;
  
  @Prop({ type: Number, required: true })
  installments: number;

  @Prop({ type: String, required: true })
  payment_method_code: string;
  
  @Prop({ type: String, required: true })
  payment_type: string;
  
  @Prop({ type: String, required: true })
  order_id: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
