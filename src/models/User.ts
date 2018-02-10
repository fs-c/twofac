import { Document, Schema, Model, model } from 'mongoose';

export interface IUserDocument extends Document {
  root: boolean;
  created: number;
  nickname: string;
  password: string;
  sharedSecrets: string[];
}

const UserSchema = new Schema({
  nickname: String,
  password: String,
  sharedSecrets: [ String ],
  root: { type: Boolean, default: false },
  created: { type: Date, default: Date.now() },
});

export const User: Model<IUserDocument> = model<IUserDocument>(
  'User',
  UserSchema,
);
