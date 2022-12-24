import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { BotConnectionError } from '../errors/botErrors.js';
import { routes } from '../routes/index.js';
import { WizardSceneInterface } from '../interfaces/WizardSceneInterface.js';
import { updateAndNotify } from '../intervals/updateAndNotify.js';

dotenv.config();

const { BOT_API_TOKEN } = process.env;

if (!BOT_API_TOKEN) throw new BotConnectionError('Bot Token inválido!');

const bot = new Telegraf<WizardSceneInterface>(BOT_API_TOKEN);

routes(bot);

setTimeout(async () => {
  await updateAndNotify();
 }, 10000); // 10 segundos

setInterval(async () => {
 await updateAndNotify();
}, 300000); // 5 minutos

export default bot;
