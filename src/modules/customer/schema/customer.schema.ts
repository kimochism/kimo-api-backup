import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true, id: true })
export class Customer {
    
    @Prop({ type: String, unique: true })
    document: string;

    @Prop({ type: String, required: true })
    full_name: string;

    @Prop({ type: String, required: true })
    cell_phone_number: string;

    @Prop({ type: Date })
    birth_date: Date;

    @Prop({ type: String, required: true, unique: true })
    user_id: string;

    @Prop({ type: Array })
    address: string[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
