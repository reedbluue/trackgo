import { Format, Scenes } from "telegraf";
import { BaseSceneInterface } from "../interfaces/WizardSceneInterface.js";

export const userScene = new Scenes.BaseScene<BaseSceneInterface>("userScene");

userScene.enter(async (ctx, next) => {
  await ctx.reply("Entrou Usuário");
  next();
});

userScene.start(async ctx => {
  await ctx.reply(
    `Bem-Vindo(a) ao TrackBot.\nInicie com o comando:` // TODO: Melhorar resposta e formatação
  );
  await ctx.reply(Format.code('/help"'));
});