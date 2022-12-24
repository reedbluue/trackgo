import mongoose from 'mongoose';
import { StatusInterface } from './StatusInterface.js';
import { UserInterface } from './UserInterface.js';

export interface TrackInterface {
  id?: string;
  user: mongoose.ObjectId | undefined | UserInterface;
  code: string;
  type?: string | null;
  description: string;
  status?: Array<StatusInterface> | null;
}
