import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export const OrderStatus = {
  pending: 'PENDING', // pendente
  charge: 'CHARGE', // cobrança
  in_process: 'IN_PROCESS', // em processamento
  in_separation: 'IN_SEPARATION', // em separação
  shipped: 'SHIPPED', // enviado
  delivered: 'DELIVERED', // entregue
  not_delivered: 'NOT_DELIVERED', // não entregue
  cancelled: 'CANCELLED', // cancelado
};
export interface OrderModel extends Document {
  readonly id: string;
  status: string;  
  readonly sent: boolean;  
  readonly delivered: boolean;  
  readonly amount: number;
  readonly freight: number;
  readonly customer_id: string;
  readonly products: string[];
}

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
