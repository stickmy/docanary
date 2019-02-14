const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const globby = require('globby');
const load = require('../prepare');
const { logger } = require('../utils');
const createServerConfig = require('../webpack/server');
const createClientConfig = require('../webpack/client');
const { applyConfigureWebpack } = require('../webpack/util');

function compile(config) {
	return new Promise((resolve, reject) => {
		webpack(config, (err, stats) => {
			if (err) {
				reject(err);
			}
			if (stats.hasErrors()) {
				stats.toJson().errors.forEach(e => {
					logger.error(e);
				});
				reject(new Error(`Failed to compile with errors.`));
			}
			if (stats.hasWarnings()) {
				stats.toJson().warnings.forEach(warning => {
					logger.warn(warning);
				});
			}
			resolve(stats.toJson({ modules: false }));
		});
	});
}

module.exports = async function build(siteDir) {
	process.env.NODE_ENV = 'production';
	logger.info('Start building...');

	const options = await load(siteDir);

	let serverConfig = createServerConfig(options).toConfig();
	let clientConfig = createClientConfig(options).toConfig();

	const {
		siteConfig: { configureWebpack },
	} = options;
	clientConfig = applyConfigureWebpack(configureWebpack, clientConfig, false);
	serverConfig = applyConfigureWebpack(configureWebpack, serverConfig, true);

	// We cannot run them in parallel because the server need to pickup the correct client bundle name
	await compile(clientConfig);

	// Build the server bundles (render the static HTML and pick client bundle)
	await compile(serverConfig);

	// Copy static files
	const { outDir } = options;
	const staticDir = path.resolve(siteDir, 'static');
	const staticFiles = await globby(['**'], {
		cwd: staticDir,
	});
	await Promise.all(
		staticFiles.map(async source => {
			const fromPath = path.resolve(staticDir, source);
			const toPath = path.resolve(outDir, source);
			return fs.copy(fromPath, toPath);
		}),
	);

	const relativeDir = path.relative(process.cwd(), outDir);
	logger.success(`Generated static files in ${relativeDir}.\n`);
};
