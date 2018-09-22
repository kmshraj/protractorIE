// import * as chalk from 'chalk';
const chalk = require('chalk');

export class LogTraceFor {
    /**
     * Class to print all related with the view's elements'.
     */
    static view(text: string) {
        console.log(chalk.bgMagenta(text));
    }

    /**
     * Class to print all related with the information content like timeouts,
     * usernames, enviroments names, etc.
     */
    static info(text: string) {
        console.log(chalk.bold.bgGreen(text));
    }

    /**
     * Class to print all related with error's messages alerts & messages
     */
    static error(text: string) {
        console.log(chalk.bold.bgRed(text));
    }

    /**
     * Class to print all related with remainders or warning messages.
     */
    static warning(text: string) {
        console.log(chalk.bold.bgYellow(text));
    }

    /**
     * Class to print all related with other remarkable part of the code that they don't
     * belong to one of the other options
     */
    static utils(text: string) {
        console.log(chalk.bold.bgCyan(text));
    }
}
