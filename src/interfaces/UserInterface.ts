import mongoose from 'mongoose';

export interface UserInterface {
  _id?: mongoose.ObjectId;
  telegramId: String;
  chatId: number;
  name: String;
  lastName?: String;
  isBeta?: Boolean;
}