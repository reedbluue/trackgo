import { Schema } from 'mongoose';
import { TrackDao } from '../daos/TrackDao.js';
import { TrackCreateError } from '../errors/trackErrors.js';
import { TrackInterface } from '../interfaces/TrackInterface.js';

export abstract class TrackService {
  public static async adicionar(
    track: TrackInterface
  ): Promise<TrackInterface> {
    try {
      const { code, user } = track;
      const res = await TrackDao.read({ code, user });
      if (res.length)
        throw new TrackCreateError(
          'Já existe uma Track registrada com esse código para esse usuário!'
        );
      return await TrackDao.create(track);
    } catch (err: any) {
      throw new TrackCreateError(err);
    }
  }

  public static async isDuplicate(
    code: string, user: Schema.Types.ObjectId
  ): Promise<boolean> {
    try {
      const res = await TrackDao.read({ code, user });
      if (res.length)
        return false;
      return true;
    } catch (err: any) {
      throw new TrackCreateError(err);
    }
  }
}