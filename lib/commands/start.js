const path = require('path');
const fs = require('fs-extra');
const portfinder = require('portfinder');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const chokidar = require('chokidar');
const serve = require('webpack-serve');
const mount = require('koa-mount');
const range = require('koa-range');
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');
const serveStatic = require('koa-static');
const load = require('../prepare');
const { Logger } = require('../utils');
const openBrowser = require('../utils/openBrowser');
const createClientConfig = require('../webpack/client');
const { applyConfigureWebpack } = require('../webpack/util');

const log = new Logger();

function getHost(host) {
	return host || '127.0.0.1';
}

async function getPort(reqPort) {
	portfinder.basePort = parseInt(reqPort, 10) || 3000;
	const port = await portfinder.getPortPromise();
	return port;
}

module.exports = async function start(siteDir, cliOptions = {}) {
	const options = await load(siteDir);
	const { siteConfig } = options;

	const reload = () => {
		load(siteDir).catch(err => {
			log.warn(err.stack);
		});
	};

	const docsRelativeDir = siteConfig.docsDir || siteConfig.defaultDocsPath;
	const pagesRelativeDir = siteConfig.pagesDir || siteConfig.defaultPagesPath;
	const componentsRelativeDir = siteConfig.componentsDir || siteConfig.defaultComponentsPath;

	const fsWatcher = chokidar.watch(
		[
			`${docsRelativeDir}/**/*.md`,
			`${pagesRelativeDir}/**/*.md`,
			`${componentsRelativeDir}/**/*.js`,
			'siteConfig.js',
		],
		{
			cwd: siteDir,
			ignoreInitial: true,
		},
	);
	fsWatcher.on('add', reload);
	fsWatcher.on('change', reload);
	fsWatcher.on('unlink', reload);
	fsWatcher.on('addDir', reload);
	fsWatcher.on('unlinkDir', reload);

	const port = await getPort(cliOptions.port);
	const hotPort = await getPort(port + 1);

	const host = getHost(cliOptions.host);

	const { baseUrl } = siteConfig;
	const url = `http://${host}:${port}${baseUrl}`;

	let config = createClientConfig(options);

	config.plugin('html-webpack-plugin').use(HtmlWebpackPlugin, [
		{
			inject: false,
			hash: true,
			template: path.resolve(__dirname, '../core/devTemplate.ejs'),
			filename: 'index.html',
			title: siteConfig.title,
		},
	]);

	config = config.toConfig();

	const { configureWebpack } = siteConfig;
	config = applyConfigureWebpack(configureWebpack, config, false);

	const compiler = webpack(config);

	await serve(
		{},
		{
			compiler,
			open: false,
			devMiddleware: {
				logLevel: 'silent',
			},
			hotClient: {
				port: hotPort,
				logLevel: 'info',
			},
			logLevel: 'info',
			logTime: true,
			port,
			host,
			add: app => {
				const staticDir = path.resolve(siteDir, 'static');
				if (fs.existsSync(staticDir)) {
					app.use(mount(baseUrl, serveStatic(staticDir)));
				}

				app.use(range);

				// rewrite request to `/` in dev
				app.use(
					convert(
						history({
							rewrites: [{ from: /\.html$/, to: '/' }],
						}),
					),
				);
			},
			on: {
				listening: () => {
					openBrowser(url);
				},
			},
		},
	);
};
