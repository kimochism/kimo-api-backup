import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface ImageModel extends Document {
  readonly id: string;
  readonly url?: string;
  readonly name?: string;
  readonly product_id?: string;
}

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
