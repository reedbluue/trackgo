import dotenv from 'dotenv';
import { Context } from 'telegraf';

dotenv.config();

const { ADMIN_USERNAME } = process.env;

export const adminValidation = (ctx: Context, next: Function) => {
  if (!(ctx.from?.username === ADMIN_USERNAME)) return;
  next();
};
