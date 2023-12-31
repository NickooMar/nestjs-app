import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: true, required: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  username: string;

  @Prop({ required: true, trim: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
