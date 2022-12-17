import { Format, Scenes } from "telegraf";
import { WizardSceneInterface } from "../interfaces/WizardSceneInterface.js";
import registrationRouter from "../routes/registrationRouter.js";

export const guestScene = new Scenes.WizardScene<WizardSceneInterface>("guestScene",
  async ctx => {}
);

guestScene.use(registrationRouter);

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