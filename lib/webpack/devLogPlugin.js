const chalk = require('chalk');
const { logger, performance, clearScreen } = require('../utils');

module.exports = class DevLogPlugin {
	constructor(options) {
		this.options = options;
	}

	apply(compiler) {
		let isFirst = true;
		performance.start();
		compiler.hooks.done.tap('docanary-log', stats => {
			clearScreen();

			const { displayUrl } = this.options;
			const time = new Date().toTimeString().match(/^[\d:]+/)[0];

			logger.success(
				`${chalk.gray(`[${time}]`)} Build ${chalk.italic(
					stats.hash.slice(0, 6),
				)} ` +
					`finished in ${stats.endTime - stats.startTime} ms! ` +
					(isFirst ? '' : `${chalk.gray(`(${displayUrl})`)}`),
			);
			if (isFirst) {
				isFirst = false;
				console.log(
					`${chalk.gray('>')} Docanary dev server listening at ${chalk.cyan(
						displayUrl,
					)}`,
				);
				const { duration } = performance.stop();
				logger.info(
					`It took a total of ${chalk.cyan(
						`${duration}ms`,
					)} to run the ${chalk.cyan('docanary start')} for the first time.`,
				);
			}
		});
		compiler.hooks.invalid.tap('docanary-log', clearScreen);
	}
};
