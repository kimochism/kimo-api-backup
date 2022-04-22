import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export const PaymentStatus = {
  pending: 'PENDING',
  aprroved: 'APPROVED',
  in_process: 'IN_PROCESS',
  rejected: 'REJECTED',
  cancelled: 'CANCELLED',
};
export interface PaymentModel extends Document {
  readonly id: string;
  readonly status: string;
  readonly amount: number;
  readonly installments: number;
  readonly payment_method_code: number;
  readonly payment_type: number;
  readonly order_id: string;
  readonly pix_qr_code?: string;
  readonly pix_qr_code64?: string;
}

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
  
  @Prop({ type: String, required: false })
  pix_qr_code: string;
  
  @Prop({ type: String, required: false })
  pix_qr_code64: string;
  
  @Prop({ type: String, required: true })
  order_id: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
