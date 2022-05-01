'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tracks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      code: {
        type: Sequelize.STRING(13),
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: Sequelize.STRING,
      data: Sequelize.DATEONLY,
      hora: Sequelize.TIME,
      origem: Sequelize.STRING,
      destino: Sequelize.STRING,
      local: Sequelize.STRING,
      notifica: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tracks');
  }
};
