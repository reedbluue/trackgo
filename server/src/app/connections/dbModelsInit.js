import dbConnection from './dbConnection.js';
import Track from '../../database/models/Track.js';

const dbModelsInit = () => {
  Track.init(dbConnection);
}

export default dbModelsInit;