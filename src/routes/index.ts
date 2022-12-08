import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import tokenRouter from "./tokenRouter.js";

export const routes = (bot:Telegraf<Context<Update>>) => {

  bot.use(
    tokenRouter
  );

}