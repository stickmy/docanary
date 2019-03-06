const path = require('path');
const staticSiteGenerator = require('static-site-generator-webpack-plugin');
const webpackNiceLog = require('webpack-nicelog');
const createBaseConfig = require('./base');
const { applyChainWebpack } = require('./util');

module.exports = function createServerConfig(options) {
	const isProd = process.env.NODE_ENV === 'production';

	const config = createBaseConfig(options, true);

	config.entry('main').add(path.resolve(__dirname, '../core/serverEntry.js'));
	config.target('node');
	config.output.filename('server.bundle.js').libraryTarget('commonjs2');

	// https://github.com/webpack/webpack/issues/6522
	config.output.globalObject('this');

	const { siteConfig, docsMetadatas, pagesMetadatas } = options;

	const docsFlatMetadatas = Object.values(docsMetadatas);
	const pagesFlatMetadatas = Object.values(pagesMetadatas);
	const paths = [...docsFlatMetadatas, ...pagesFlatMetadatas].map(
		data => data.permalink,
	);
	// fix: In docsUrl === baseUrl case
	// Page which path is baseUrl lose in routes.js.
	if (siteConfig.baseUrl === siteConfig.docsUrl) {
		paths.push(siteConfig.baseUrl);
	}
	config.plugin('siteGenerator').use(staticSiteGenerator, [
		{
			entry: 'main',
			locals: {
				baseUrl: siteConfig.baseUrl,
			},
			paths,
		},
	]);

	config
		.plugin('niceLog')
		.use(webpackNiceLog, [
			{ name: 'Server', color: 'yellow', skipBuildTime: isProd },
		]);

	applyChainWebpack(siteConfig.chainWebpack, config, true);

	return config;
};
