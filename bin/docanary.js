#!/usr/bin/env node

const chalk = require('chalk');
const semver = require('semver');
const path = require('path');
const program = require('commander');
const { start } = require('../lib');

function commandWrap(fn) {
	return (...args) =>
		fn(...args).catch(error => {
			console.error(chalk.red(error.stack));
			process.exitCode = 1;
		});
}
program
	.version(require('../package.json').version)
	.usage('<command> [options]');

program
	.command('start [siteDir]')
	.description('Start development server')
	.option('-p, --port <port>', 'use specified port (default: 3000)')
	.action((siteDir = '.', { port }) => {
		commandWrap(start)(path.resolve(siteDir), { port });
	});

program.parse(process.argv);