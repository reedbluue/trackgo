import { TrackInterface } from '../interfaces/TrackInterface.js';
import { Track } from '../models/Track.js';

export abstract class TrackDao {
  public static async create(model: TrackInterface): Promise<TrackInterface> {
    const track = await Track.create(model);
    return track;
  }

  public static async read(keys: Object): Promise<Array<TrackInterface>> {
    const tracks = await Track.find(keys);
    return tracks;
  }

  public static async update(
    keys: Object,
    model: TrackInterface
  ): Promise<Array<TrackInterface>> {
    const tracks = await Track.find(keys);
    tracks.map(async (track) => {
      return await track.update(model);
    });
    return await Track.find(keys);
  }

  public static async delete(keys: Object): Promise<boolean> {
    const tracks = await Track.find(keys);
    if(!tracks.length)
      return false;
    tracks.forEach(async (track) => {
      await track.delete();
    });
      return true;
  }
}
