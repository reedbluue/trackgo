import { Telegraf } from "telegraf";
import dotenv from 'dotenv';
import { BotConnectionError } from "../errors/botErrors.js";
import { userValidation } from "../middlewares/userValidation.js";

dotenv.config();

const { BOT_API_TOKEN } = process.env;

if(!BOT_API_TOKEN)
  throw new BotConnectionError('Bot Token inválido!');

const bot = new Telegraf(BOT_API_TOKEN);

bot.use(userValidation);

bot.on('text', async ctx => {
  await ctx.reply('Você está autorizado!');
})

export default bot;