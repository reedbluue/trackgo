import { startDbConnection } from './configs/dbConfig.js';
import bot from './services/BotService.js';
import { server } from './configs/aliveServer.js';
import dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;

server.listen(PORT || 3000);

await startDbConnection();

bot.launch();
