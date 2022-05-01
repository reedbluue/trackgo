import { Model, DataTypes } from 'sequelize';

class Track extends Model {

  static init(sequelize) {
    super.init({
      code: {
        type: DataTypes.STRING(13),
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: DataTypes.STRING,
      data: DataTypes.DATEONLY,
      hora: DataTypes.TIME,
      origem: DataTypes.STRING,
      destino: DataTypes.STRING,
      local: DataTypes.STRING,
      notifica: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      sequelize
    });
  }
}

export default Track;