import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface AddressModel extends Document {
    readonly id: string;
    readonly zip_code: string;
    readonly street: string;
    readonly number: string;
    readonly complement: string;
    readonly district: string;
    readonly city: string;
    readonly state: string;
    readonly reference: string;
}

@Schema({ timestamps: true, id: true })
export class Address {
    
    @Prop({ type: String, required: true })
    zip_code: string;

    @Prop({ type: String, required: true })
    street: string;

    @Prop({ type: String, required: true })
    number: string;

    @Prop({ type: String })
    complement: string;

    @Prop({ type: String, required: true })
    district: string;

    @Prop({ type: String, required: true })
    city: string;

    @Prop({ type: String, required: true })
    state: string;

    @Prop({ type: String })
    reference: string;

}

export const AddressSchema = SchemaFactory.createForClass(Address);
