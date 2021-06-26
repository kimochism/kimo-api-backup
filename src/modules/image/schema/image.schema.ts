import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema({ timestamps: true })
export class Image {
  
  @Prop({ type: String, required: false })
  url: string;

  @Prop({ type: String, required: false })
  name: string;

  @Prop({ type: String, required: false})
  product_id: string;

}

export const ImageSchema = SchemaFactory.createForClass(Image);
