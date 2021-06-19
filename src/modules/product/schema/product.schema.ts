import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePagination from 'mongoose-paginate-v2';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  size: string;

  @Prop({ type: String, required: true })
  color: string;
  
  @Prop({ type: String, required: true })
  type: string;
  
  @Prop({ type: String, required: true })
  price: number;
  
  @Prop({ type: String, required: true })
  discount_price: number;

  @Prop({ type: Array, required: true})
  images: string[]

}

export const ProductSchema = SchemaFactory.createForClass(Product).plugin(mongoosePagination);

