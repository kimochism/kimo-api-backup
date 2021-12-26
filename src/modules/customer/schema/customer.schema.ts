import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface CustomerModel extends Document {
    readonly id: string;
    readonly document: string;
    readonly full_name: string;
    readonly cell_phone_number: string;
    readonly birth_date: Date;
    readonly user_id: string;
    readonly address: string[];
}

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
    addresses: string[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
