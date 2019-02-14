const chalk = require('chalk');

/**
 * 4: debug
 * 3: warn success wait tip info
 * 1: error
 */

class Logger {
	constructor(options) {
		this.prefix = '[docanary] ';
		this.options = Object.assign(
			{
				logLevel: process.argv.includes('--debug') ? 4 : 3,
			},
			options,
		);
	}

	setOptions(options) {
		Object.assign(this.options, options);
	}

	// level: 4
	debug(...args) {
		if (this.options.logLevel < 4) {
			return;
		}
		this.status('magenta', 'debug', ...args);
	}

	warn(...args) {
		if (this.options.logLevel < 2) {
			return;
		}
		console.warn(chalk.yellow(this.prefix + 'warning'), ...args);
	}

	error(...args) {
		if (this.options.logLevel < 1) {
			return;
		}
		process.exitCode = process.exitCode || 1;
		console.error(chalk.red(this.prefix + 'error'), ...args);
	}

	// level: 3
	success(...args) {
		if (this.options.logLevel < 3) {
			return;
		}
		this.status('green', 'success', ...args);
	}

	tip(...args) {
		if (this.options.logLevel < 3) {
			return;
		}
		this.status('blue', 'tip', ...args);
	}

	// level: 3
	info(...args) {
		if (this.options.logLevel < 3) {
			return;
		}
		this.status('cyan', 'info', ...args);
	}

	// level: 3
	wait(...args) {
		if (this.options.logLevel < 3) {
			return;
		}
		this.status('cyan', 'wait', ...args);
	}

	// level: 3
	status(color, label, ...args) {
		if (this.options.logLevel < 3) {
			return;
		}
		console.log(chalk[color](this.prefix + label), ...args);
	}
}

module.exports = new Logger();
