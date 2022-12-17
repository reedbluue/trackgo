import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { BotConnectionError } from '../errors/botErrors.js';
import { routes } from '../routes/index.js';
import { WizardSceneInterface } from '../interfaces/WizardSceneInterface.js';

dotenv.config();

const { BOT_API_TOKEN } = process.env;

if (!BOT_API_TOKEN) throw new BotConnectionError('Bot Token inválido!');

const bot = new Telegraf<WizardSceneInterface>(BOT_API_TOKEN);

routes(bot);

export default bot;
