import { Scenes } from "telegraf"
import { infoTrack, returnIdList, updateTrack } from "../functions/botFunctions.js";

const codePattern = /[a-z]{2}\d{9}[a-z]{2}/i;

const cenaAtualizaRastreio = new Scenes.WizardScene('cenaAtualizaRastreio',
  async ctx => {
    await ctx.reply(`Olá, ${ctx.message.chat.first_name}!  &#x1F44B  Vamos atualizar uma Track!

Para começar, precisamos saber qual rastreio que deseja atualizar.
Porfavor digite o ID da track:

Caso não se lembre do ID, pode digitar o comando "/listaid" :D`, {parse_mode: "HTML"});
    await ctx.reply(`Para sair do assistente, basta digitar "/sair" ^^`, { parse_mode: "HTML" });
    return ctx.wizard.next();
  },
  async ctx => {
    try {
      ctx.session.id = Number(ctx.message.text);
      await infoTrack(ctx, ctx.session.id);
      await ctx.reply(`Este é o objeto que vamos alterar.
<s>Caso queria alterar utilize o comando "/recomeçar" :p</s>`, {parse_mode: "HTML"});
      await ctx.reply(`Inclusive, o que deseja alterar em sua track?

Digite uma das opções:
&#x0031; - Descrição  |  &#x0032; - Código de Rastreio`, {parse_mode: "HTML"});
      return ctx.wizard.next();
    } catch (err) {
      return;
    }
  },
  async ctx => {
    if (ctx.message.text == '1') {
      await ctx.reply(`Vamos atualizar a descrição &#x1F604;
Porfavor, atribua um nome para o rastreio:`, {parse_mode: "HTML"});
      return ctx.wizard.next();
    } else if (ctx.message.text == '2') {
      await ctx.reply(`Vamos atualizar o código de rastreio &#x1F604;
Digite os 13 dígitos no padrão "XX123456789XX":`, {parse_mode: "HTML"});
      return ctx.wizard.selectStep(4);
    } else {
      await ctx.reply(`O valor que você digitou é inválido &#x1F613;
Porfavor, tente novamente com um valor válido!`, {parse_mode: "HTML"});
      return;
    }
  },
  async ctx => {
    if (ctx.message.text.length <= 3) {
      await ctx.reply(`&#x26A0;  <b>Descrição muito curta</b>  &#x26A0;
<i>A descrição precisa ser maior do que 3 caracteres!</i>`, {parse_mode: "HTML"});
    } else {
      try {
        ctx.session.description = ctx.message.text;
        await updateTrack(ctx, ctx.session.id, null, ctx.session.description);
        await ctx.reply(`&#x2705  Track atualizada com sucesso!  &#x2705`, {parse_mode: "HTML"});
        return await ctx.scene.leave();
      } catch (err) {
        return;
      }
    }
  },
  async ctx => {
    if (!codePattern.test(ctx.message.text)) {
      await ctx.reply(`&#x26A0;  <b>Formato do código inválido!</b>  &#x26A0;
<i>Digite os 13 dígitos no padrão "XX123456789XX"</i>`, {parse_mode: "HTML"});
    } else {
      ctx.session.code = ctx.message.text;
      try {
        await updateTrack(ctx, ctx.session.id, ctx.session.code, null);
        await ctx.reply(`&#x2705  Track atualizada com sucesso!  &#x2705`, {parse_mode: "HTML"});
        return await ctx.scene.leave();
      } catch (err) {
        return;
      }
    }
  }
);

cenaAtualizaRastreio.command('sair', async ctx => {
  await ctx.scene.leave();
  await ctx.reply(`Você saiu do assitente de atualização de Tracks!  &#x1F3C3;`, {parse_mode: "HTML"});
});

cenaAtualizaRastreio.command('listaid', returnIdList);

export default cenaAtualizaRastreio;