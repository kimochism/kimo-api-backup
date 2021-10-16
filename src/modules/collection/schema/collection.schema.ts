import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface CollectionModel extends Document {
    readonly id: string;
    readonly name: string;
    readonly products: string[];
  }

@Schema({ timestamps: true, id: true })
export class Collection {
    
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: Array, required: true })
    products: string[]
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
