import { Markup, Scenes } from "telegraf";
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
  await ctx.replyWithHTML(
    `<b>Você está no modo visitante 🕵</b>

Para utilizar o TrackBot, você precisa estar registrado. Caso tenha um convite, insira o token utilizando o comando:

<code>/entrar "SEU_TOKEN_AQUI"</code>`);
});