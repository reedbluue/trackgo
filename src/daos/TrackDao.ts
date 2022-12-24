import { TrackInterface } from '../interfaces/TrackInterface.js';
import { Track } from '../models/Track.js';

export abstract class TrackDao {
  public static async create(model: TrackInterface): Promise<TrackInterface> {
    const track = await Track.create(model);
    return track;
  }

  public static async read(keys: Object, populate?: boolean): Promise<Array<TrackInterface>> {
    const tracks = !populate ? await Track.find(keys) : await Track.find(keys, {}, {populate: 'user'});
    return tracks;
  }

  public static async update(
    keys: Object,
    model: Object,
    populate?: Boolean
  ): Promise<Array<TrackInterface>> {
    const tracks = await Track.find(keys);
    
    for(const track of tracks) {
      await track.updateOne(model);
    }

    const updatedTracks = await Track.find(keys, {}, {populate: 'user'});

    return updatedTracks;
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
