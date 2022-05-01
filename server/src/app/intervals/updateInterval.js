import TrackController from '../controllers/TrackController.js';
import LogHelper from '../helpers/Loghelper.js';

const updateInterval = ms => {
  setInterval(async () => {
    try {
      await TrackController.updateAll();
    } catch (err) {
      LogHelper.error('Falha ao atualizar as Tracks', err);
    }
  }, ms);
}

export default updateInterval;