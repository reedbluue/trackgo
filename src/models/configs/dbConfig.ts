import mongoose from "mongoose";
import dotenv from 'dotenv';
import chalk from 'chalk';
import { DbConnectionError } from "../../errors/dbErrors.js";

dotenv.config();

const URI = process.env.CONNECTION_STRING;

if(!URI)
  throw new DbConnectionError('A string de conexão é inválida!');

if(!mongoose.connection.readyState) {
  try {
    await mongoose.connect(URI);
    console.log(chalk.green('Sucesso na conexão com o banco de dados!'));
  } catch (err) {
    throw new DbConnectionError();
  }
}

mongoose.connection.on('error', (err: ErrorEvent) => {
  throw new DbConnectionError(err.error);
});

export default mongoose;