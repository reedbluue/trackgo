import { Composer, Format, Scenes } from "telegraf";
import { BaseSceneInterface } from "../interfaces/WizardSceneInterface.js";

export const guestScene = new Scenes.BaseScene<BaseSceneInterface>("guestScene");

guestScene.enter(async (ctx, next) => {
  await ctx.reply("Entrou Convidado");
  next();
});

guestScene.start(async (ctx, next) => {
  await ctx.reply(
    `Você está no modo visitante.\nPara utilizar o TrackBot, você precisa estar registrado. Caso tenha um convite, insira o token utilizando o comando:` // TODO: Melhorar resposta e formatação
  );
  await ctx.reply(Format.code('/join "token"'));
});