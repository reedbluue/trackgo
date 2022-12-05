import { startDbConnection } from "./configs/dbConfig.js";
import bot from "./services/BotService.js";

await startDbConnection();

bot.launch();