const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const spawn = require('child_process').spawn;
const version = require('../../package.json').version;
const peerDependencies = require('../../package.json').peerDependencies;
const dependencies = require('../../package.json').dependencies;

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

function installDependencies(cwd, executable = 'npm', color) {
	console.log(`\n\n# ${color('Installing dependencies ...')}`);
	console.log('# ========================\n');
	return runCommand(executable, ['install'], {
		cwd,
	});
}

module.exports = async function init(projectDir) {
	const projectName = path.basename(projectDir);
	const pkg = {
		name: projectName,
		dependencies: {
			'docanary': `^${version}`,
			'react': dependencies.react,
			'react-dom': dependencies['react-dom']
		},
		peerDependencies,
		license: 'MIT',
	};

	const pkgFile = path.resolve(projectDir, 'package.json');

	await fs.ensureFile(pkgFile);

	await fs.writeFile(
		path.resolve(projectDir, 'package.json'),
		JSON.stringify(pkg, null, 2) + '\n',
	);

	installDependencies(projectDir, 'npm', chalk.green)
		.then(() => {
			console.log();
			console.log(chalk.green(`Success! Bootstrap project on ${projectDir}`));
		})
		.catch(e => {
			console.log(chalk.red('Error: '), e);
		});
};
