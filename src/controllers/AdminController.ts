import { Context, Format, NarrowedContext } from "telegraf";
import { Update, Message } from "telegraf/typings/core/types/typegram";
import { TokenService } from "../services/TokenService.js";

export abstract class AdminController {
  public static geraToken = async (
    ctx: NarrowedContext<
      Context<Update>,
      {
        message: Update.New & Update.NonChannel & Message.TextMessage;
        update_id: number;
      }
    >
  ) => {
    const token = await TokenService.generateKey();
    await ctx.reply(`Token gerado:`);
    return await ctx.reply(Format.spoiler(token));
  };

  public static resetaTokens = async (
    ctx: NarrowedContext<
      Context<Update>,
      {
        message: Update.New & Update.NonChannel & Message.TextMessage;
        update_id: number;
      }
    >
  ) => {
    await TokenService.resetAllSessions();
    return await ctx.reply('Tokens deletados!');
  };
}