import dotenv from 'dotenv';
import LogHelper from '../helpers/Loghelper.js';
import { Sequelize } from "sequelize";

dotenv.config();

const dbConnection = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    underscored: true,
    timestamps: true
  }
});

try {
  await dbConnection.authenticate();
  LogHelper.success('Sucesso na conexão com o banco de dados!');
} catch (err) {
  LogHelper.error(`Falha na conexão com o banco de dados: ${err.message}`);
}

export default dbConnection;