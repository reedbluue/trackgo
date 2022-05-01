import Track from '../../database/models/Track.js';
import LogHelper from '../helpers/Loghelper.js';
import { rastrearEncomendas } from 'correios-brasil';
import DateTimeConverter from '../helpers/DateTimeConverter.js';

const codePattern = /[a-z]{2}\d{9}[a-z]{2}/i;

class TrackController {
  constructor() {
    throw new Error('A classe TrackController não deve ser instaciada!');
  }

  static async returnAll(req, res) {
    try {
      const tracks = await Track.findAll();
      res.status(200).json(tracks);
    } catch(err) {
      LogHelper.error(err.message);
      res.status(500).json({
        error: 'Falha ao obter as tracks!'
      });
    }
  }

  static async returnById(req, res) {
    const { id } = req.params;
    try {
      const track = await Track.findByPk(id);
      if (track) {
        return res.status(200).json(track);
      } else {
        return res.status(400).json({error: 'Track não localizada!'});
      }
    } catch (err) {
      LogHelper.error(err.message);
      res.status(500).json({
        error: 'Falha ao obter a track!'
      });
    }
  }

  static async create(req, res) {
    const { code, description } = req.body;
    try {
      if(codePattern.test(code)){
        if(await Track.findOne({where: {code: code.toUpperCase()}})) {
          res.status(400).json({error: 'Código de ratreio já cadastrado!'});
        } else {
          if(!description || description.length <= 3) {
            return res.status(400).json({error: 'A descrição precisa ter mais que 3 caractéres!'});
          } else {
            const track = await Track.create({
              code: code.toUpperCase(),
              description: description
            });
            await TrackController.updateAll();
            return res.status(200).json(track);
          }
        }
      } else {
        res.status(400).json({error: 'O código de rastreio não está no padrão de 13 dígitos (XX123456789XX)'});
      }
    } catch(err) {
      res.status(400).json({
        erorr: 'Falha ao adicionar uma nova track!'
      });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    let updateInfos = req.body;
    try {
      if (Object.keys(updateInfos).includes('code')) {
        if(await Track.findOne({where: {code: updateInfos.code.toUpperCase()}})) {
          return res.status(400).json({error: 'Código de ratreio já cadastrado!'});
        }
        if(codePattern.test(updateInfos.code)){
            updateInfos.code = updateInfos.code.toUpperCase();
        } else {
          return res.status(400).json({error: 'O código de rastreio não está no padrão de 13 dígitos (XX123456789XX)'});
        }
      }
  
      if (Object.keys(updateInfos).includes('description')) {
        if(!updateInfos.description || updateInfos.description.length <= 3) {
          return res.status(400).json({error: 'A descrição precisa ter mais que 3 caractéres!'});
        }
      }

      const updateResponse = await Track.update(updateInfos, {where: {id: id}});
      if (updateResponse[0]) {
        await TrackController.updateAll();
        const track = await Track.findOne({where: {id: id}});
        return res.status(200).json(track);
      } else {
        return res.status(400).json({error: 'Track não localizada!'});
      }
    } catch (err) {
      LogHelper.error(err.message);
      return res.status(500).json({
        error: 'Falha ao atualizar a track!'
      });
    }
  }

  static async remove(req, res) {
    const { id } = req.params;
    try {
      const track = await Track.findByPk(id);
      if (track) {
        await track.destroy();
        res.status(200).json({ok: true});
      } else {
        res.status(400).json({error: 'Track não localizada!'});
      }
    } catch (err) {
      LogHelper.error(err.message);
      res.status(500).json({
        error: 'Falha ao remover a track!'
      });
    }
  }

  static async updateAll() {
    try {
      const tracks = JSON.parse(JSON.stringify(await Track.findAll({
        attributes: ['id', 'code', 'status', 'data', 'hora', 'origem', 'destino', 'local', 'notifica']
      })));
  
      const codes = tracks.map(track => {
        return track.code;
      });
  
      const rastreios = await rastrearEncomendas(codes);
  
      const tracksAtt = tracks.map((track, index) => {
        if (!rastreios[index].length <= 0) {
          return {...track, ...rastreios[index][rastreios[index].length - 1]};
        } else {
          track.status = null;
          track.data = null;
          track.hora = null;
          track.origem = null;
          track.destino =null;
          track.local = null;
          track.notifica = 0;

          return track;
        }
      });
  
      tracksAtt.forEach(async (track, index) => {
        if(track.status) {
          const trackAttDate = DateTimeConverter.convert(track);
          const actTrack = await Track.findByPk(track.id);
          if(actTrack.data) {
            if (new Date(trackAttDate.data) > new Date(tracks[index].data)) {
              trackAttDate.notifica = true;
            } else if (new Date('01/01/01 ' + trackAttDate.hora) > new Date('01/01/01 ' + tracks[index].hora)) {
              trackAttDate.notifica = true;
            }
          }
          await actTrack.update(trackAttDate);
        } else {
          const actTrack = await Track.findByPk(track.id);
          await actTrack.update(track);
        }
      });
    } catch (err) {
      LogHelper.error('Falha ao atualizar as tracks' + err.message);
    }
  }

  static async notificado(req, res) {
    const { id } = req.params;

    try {
      await Track.update({notifica: 0}, {
        where: {
          id: id
        }
      });
      res.status(200).json({ok: true});
    } catch (err) {
      LogHelper.error(err);
      res.status(400).json({error: 'Falha ao confirmar a notificação!'});
    }
  }
}

export default TrackController;