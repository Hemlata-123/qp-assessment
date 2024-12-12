import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  //password: string;
  role: 'Admin' | 'User';
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  //password: { type: String, required: true },
  role: { type: String, required: true, enum: ['Admin', 'User'] },
});

export default mongoose.model<IUser>('User', UserSchema);
