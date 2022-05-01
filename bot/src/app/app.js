import dotenv from 'dotenv';
import { Telegraf, Scenes, session } from "telegraf";
import { deleteTrack, notifyTrackDisable, notifyTrackEnable, returnAllTracks, returnIdList, returnTrack } from './functions/botFunctions.js';
import cenaCriaRastreio from './scenes/cenaCriaRastreio.js';
import cenaAtualizaRastreio from './scenes/cenaAtualizaRastreio.js';

dotenv.config();

const bot = new Telegraf(process.env.TOKEN);

const stage = new Scenes.Stage([cenaCriaRastreio, cenaAtualizaRastreio]);

bot.use(session(), stage.middleware());

// COMANDOS BÁSICOS

bot.hears(/^\/listartodos$/i, returnAllTracks);

const trackByIdRegExp = /^\/track[\s](\d+?)$/i; //TODO: VERIFICAR FUNCIONAMENTO
bot.hears(trackByIdRegExp, ctx => returnTrack(ctx, trackByIdRegExp));

bot.hears(/^\/listaid$/i, returnIdList);

const deleteByIdRegExp = /^\/deletar[\s](\d+?)$/i;
bot.hears(deleteByIdRegExp, ctx => deleteTrack(ctx, deleteByIdRegExp));

bot.hears(/^\/start$/i, notifyTrackEnable);
bot.hears(/^\/stop$/i, notifyTrackDisable);

// CENAS

bot.hears(/^\/adicionar$/i, Scenes.Stage.enter('cenaCriaRastreio'));
bot.hears(/^\/atualizar$/i, Scenes.Stage.enter('cenaAtualizaRastreio'));

// INICIA BOT

bot.launch();

export default bot;