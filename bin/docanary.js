#!/usr/bin/env node

const chalk = require('chalk');
const semver = require('semver');
const path = require('path');
const program = require('commander');
const { start, build, init } = require('../lib');

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
	.command('init [siteDir]')
	.description('Initialize site')
	.action((projectDir = '.') => {
		commandWrap(init)(path.resolve(projectDir));
	});

program
	.command('start [siteDir]')
	.description('Start development server')
	.option('-p, --port <port>', 'use specified port (default: 3000)')
	.action((siteDir = '.', { port }) => {
		commandWrap(start)(path.resolve(siteDir), { port });
	});

program
	.command('build [siteDir]')
	.description('Build site')
	.action((siteDir = '.') => {
		commandWrap(build)(path.resolve(siteDir), { skipImageCompression: false });
	});

program.parse(process.argv);
