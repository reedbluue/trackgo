import mongoose from 'mongoose';
import { TrackInterface } from '../interfaces/TrackInterface.js';
import { User } from './User.js';

const TrackSchema = new mongoose.Schema<TrackInterface>({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'users',
    required: true,
  },
  code: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  type: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  status: [Object],
});

User.on('ok', () => {}); // just to initialize
export const Track = mongoose.model<TrackInterface>('tracks', TrackSchema);
