import { Context, NarrowedContext } from 'telegraf';
import { Update, Message } from 'telegraf/typings/core/types/typegram';
import { TokenService } from '../services/TokenService.js';

export abstract class TokenController {

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
    return ctx.reply(`Token: ${token}`);
  };

  public static validaToken = async (
    ctx: NarrowedContext<
      Context<Update>,
      {
        message: Update.New & Update.NonChannel & Message.TextMessage;
        update_id: number;
      }
    >
  ) => {
    const token = ctx.message.text.split(' ', 2)[1];
    if(!token || !await TokenService.validateKey(token))
      return ctx.reply("Token inválido! Verifique o token e tente novamente.");
    return ctx.reply("Token válido!");
  };
}
