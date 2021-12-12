import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface UserModel extends Document {
  readonly id: string;
  readonly email: string;
  password: string;
  readonly email_verified: boolean;
}

@Schema({ timestamps: true })
export class User {

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Boolean, required: true, default: false })
  email_verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
