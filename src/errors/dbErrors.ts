import chalk from 'chalk';

export class DbConnectionError extends Error {
  constructor(errMsg: string = 'Falha na conexão com o banco de dados!') {
    super(chalk.red(errMsg));
  }
}
