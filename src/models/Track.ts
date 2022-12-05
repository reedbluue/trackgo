import mongoose from 'mongoose';
import { TrackInterface } from '../interfaces/TrackInterface.js';
import { User } from './User.js';

const regex = /^[a-z]{2}\d{9}[a-z]{2}$/i;

const TrackSchema = new mongoose.Schema<TrackInterface>({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'users',
    required: true,
  },
  code: {
    type: mongoose.SchemaTypes.String,
    validate: {
      validator: (track: String) => regex.test(<string>track),
      message: 'Formatação errada do código de rastreio!',
    },
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: [Object],
});

User.on('ok', () => {}); // just to initialize
export const Track = mongoose.model<TrackInterface>('tracks', TrackSchema);
