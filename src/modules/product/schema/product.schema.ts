import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface ProductModel extends Document {
  readonly id: string;
  readonly name: string;
  readonly varieties: {
    color: {
      label: string;
      name: string;
    };
    size: string;
    quantity: number;
  }[];
  readonly type: string;
  readonly price: number;
  readonly discount_price: number;
  readonly images: string[]
}

@Schema({ timestamps: true })
export class Product {
  
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Array, required: true })
  varieties: {
    color: {
      label: string;
      name: string;
    };
    size: string;
    quantity: number;
  }[];
  
  @Prop({ type: String, required: true })
  type: string;
  
  @Prop({ type: String, required: true })
  price: number;
  
  @Prop({ type: String, required: true })
  discount_price: number;

  @Prop({ type: Array, required: true})
  images: string[]

}

export const ProductSchema = SchemaFactory.createForClass(Product);

