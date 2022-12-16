import { Context, Format } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

export abstract class GuestController {
  public static async welcome(ctx: Context<Update>) {
    await ctx.reply(
      `Você está no modo visitante.\nPara utilizar o TrackBot, você precisa estar registrado. Caso tenha um convite, insira o token utilizando o comando:` // TODO: Melhorar resposta e formatação
    );
    await ctx.reply(Format.code('/join "token"'));
  }
}