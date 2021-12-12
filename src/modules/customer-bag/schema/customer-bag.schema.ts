import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface CustomerBagModel extends Document {
  readonly id: string;
  quantity: number;
  readonly options: {
    size: number;
    color: {
      label: string;
      name: string;
    }
  };
  readonly customer: string;
  readonly product: string;
}

@Schema({ timestamps: true })
export class CustomerBag {
  
  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Object, required: true })
  options: {
    size: number;
    color: {
      label: string;
      name: string;
    };
  };

  @Prop({ type: String, required: true })
  customer: string;

  @Prop({ type: String, required: true })
  product: string;
}

export const CustomerBagSchema = SchemaFactory.createForClass(CustomerBag);
