import { session, Telegraf } from 'telegraf';
import { WizardSceneInterface } from '../interfaces/WizardSceneInterface.js';
import { userValidation } from '../middlewares/userValidation.js';
import { wizardStage } from '../scenes/index.js';
import adminRouter from './adminRouter.js';

export const routes = (bot: Telegraf<WizardSceneInterface>): void => {
  bot.use(adminRouter);

  bot.use(session());
  bot.use(wizardStage.middleware());

  bot.use(userValidation);

  return;
};
