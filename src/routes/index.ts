import { session, Telegraf } from "telegraf";
import { BaseSceneInterface } from "../interfaces/WizardSceneInterface.js";
import { userValidation } from "../middlewares/userValidation.js";
import { baseStage } from "../scenes/index.js";
import adminRouter from "./adminRouter.js";
import registrationRouter from "./registrationRouter.js";

export const routes = (bot:Telegraf<BaseSceneInterface>): void => {

  bot.use(session());
  bot.use(baseStage.middleware());
  
  bot.use(userValidation);

  //bot.use(baseStage.middleware()); // permite execução imediata dos comandos

  bot.use(registrationRouter);
  bot.use(adminRouter);

  return;
}

