import { Scenes } from "telegraf"
import { createTrack } from "../functions/botFunctions.js";

const codePattern = /[a-z]{2}\d{9}[a-z]{2}/i;

const cenaCriaRastreio = new Scenes.WizardScene('cenaCriaRastreio',
  async ctx => {
    await ctx.reply(`Olá, ${ctx.message.chat.first_name}!  &#x1F44B  Vamos criar uma nova Track!

Para sair do assistente, basta digitar "/sair" ^^

Para começar, precisamos de uma descrição do objeto!
Porfavor, atribua um nome para o rastreio:`, {parse_mode: "HTML"});
    return ctx.wizard.next();
  },
  async ctx => {
    if (ctx.message.text.length <= 3) {
      await ctx.reply(`&#x26A0;  <b>Descrição muito curta</b>  &#x26A0;
<i>A descrição precisa ser maior do que 3 caracteres!</i>`, {parse_mode: "HTML"});
    } else {
      ctx.session.description = ctx.message.text;
      await ctx.reply(`Isso aí!  &#x1F601  Você está indo super bem!

Agora vamos precisar código de rastreio!
Digite os 13 dígitos no padrão "XX123456789XX":`, {parse_mode: "HTML"});
      return ctx.wizard.next();

    }
  },
  async ctx => {
    if (!codePattern.test(ctx.message.text)) {
      await ctx.reply(`&#x26A0;  <b>Formato do código inválido!</b>  &#x26A0;
<i>Digite os 13 dígitos no padrão "XX123456789XX"</i>`, {parse_mode: "HTML"});
    } else {
      ctx.session.code = ctx.message.text;
      try {
        await createTrack(ctx, ctx.session.code, ctx.session.description);
        await ctx.reply(`&#x2705  Track criada com sucesso!  &#x2705`, {parse_mode: "HTML"});
        return ctx.scene.leave();
      } catch (err) {
        return;
      }
    }
  }
);

cenaCriaRastreio.command('sair', async ctx => {
  await ctx.scene.leave();
  await ctx.reply(`Você saiu do assitente de criação de Tracks!  &#x1F3C3;`, {parse_mode: "HTML"});
});

export default cenaCriaRastreio;