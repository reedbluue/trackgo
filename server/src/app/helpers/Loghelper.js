import chalk from "chalk";

class LogHelper {
  constructor() {
    throw new Error('A classe LogHelper não deve ser instaciada!');
  }

  static success(value) {
    console.log(chalk.green(value));
  }

  static error(value) {
    console.log(chalk.red(value));
  }
}

export default LogHelper;