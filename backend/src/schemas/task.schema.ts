import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../modules/users/types/user.type';

@Schema({
  timestamps: true,
})
export class Task {
  @Prop({ unique: true, required: true, trim: true })
  title: string;

  @Prop({
    trim: true,
  })
  description: string;

  @Prop({ default: false })
  done: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
