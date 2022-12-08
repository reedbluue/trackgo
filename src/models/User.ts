import mongoose from 'mongoose';
import { UserInterface } from '../interfaces/UserInterface.js';

const UserSchema = new mongoose.Schema<UserInterface>({
  telegramId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    default: null,
  },
  isBeta: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true
});

export const User = mongoose.model<UserInterface>('users', UserSchema);
