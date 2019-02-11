const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const spawn = require('child_process').spawn;

const buildPath = path.resolve(process.cwd(), 'site');
const docsPath = path.resolve(process.cwd(), 'docs');

function runCommand(cmd, args, options) {
	return new Promise((resolve, reject) => {
		const spwan = spawn(
			cmd,
			args,
			Object.assign(
				{
					cwd: process.cwd(),
					stdio: 'inherit',
					shell: true,
				},
				options,
			),
		);

		spwan.on('exit', () => {
			resolve();
		});
	});
}

function clean() {
	fs.removeSync(buildPath);
}

function copy() {
	fs.ensureDirSync(buildPath);
	fs.copySync(path.resolve(docsPath, 'build'), buildPath);
}

function start() {
	runCommand('npx docanary', ['build'], {
		cwd: docsPath,
	}).then(() => {
		clean();
		copy();
	}).catch(e => {
		console.log(chalk.red(e));
	});
}

start();
