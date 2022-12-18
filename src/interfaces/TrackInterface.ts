import mongoose from 'mongoose';
import { Status } from '../models/Status.js';
import { UserInterface } from './UserInterface.js';

export interface TrackInterface {
  user: mongoose.ObjectId | undefined | UserInterface;
  code: string;
  type: string;
  description: string;
  status: Array<Status>;
}