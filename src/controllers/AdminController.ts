import { Context, NarrowedContext } from 'telegraf';
import { Update, CallbackQuery } from 'telegraf/typings/core/types/typegram';
import { TokenService } from '../services/TokenService.js';
import { UserSessionService } from '../services/UserSessionService.js';

export abstract class AdminController {
  public static geraToken = async (
    ctx: NarrowedContext<
      Context<Update> & {
        match: RegExpExecArray;
      },
      Update.CallbackQueryUpdate<CallbackQuery>
    >
  ) => {
    const token = await TokenService.generateKey();
    return await ctx.replyWithHTML(`<b>Convite gerado:</b>

<code>${token}</code>`);
  };

  public static resetaTokens = async (
    ctx: NarrowedContext<
      Context<Update> & {
        match: RegExpExecArray;
      },
      Update.CallbackQueryUpdate<CallbackQuery>
    >
  ) => {
    await TokenService.resetAllSessions();
    return await ctx.replyWithHTML('<b>Convites deletados!</b>');
  };

  public static resetaSessions = async (
    ctx: NarrowedContext<
      Context<Update> & {
        match: RegExpExecArray;
      },
      Update.CallbackQueryUpdate<CallbackQuery>
    >
  ) => {
    await UserSessionService.resetAllSessions();
    return await ctx.replyWithHTML('<b>Sessões resetadas!</b>');
  };
}
