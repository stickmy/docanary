const path = require('path');
const webpackNiceLog = require('webpack-nicelog');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const { applyChainWebpack } = require('./util');
const createBaseConfig = require('./base');

module.exports = function createClientConfig(options) {
	const isProd = process.env.NODE_ENV === 'production';

	const { outDir, siteConfig } = options;

	const config = createBaseConfig(options);

	config.entry('main').add(path.resolve(__dirname, '../core/clientEntry.js'));

	// clean build folders
	config
		.plugin('clean')
		.use(cleanWebpackPlugin, [outDir, { verbose: false, allowExternal: true }]);

	config
		.plugin('client-stats')
		.use(StatsWriterPlugin, [{ filename: 'client.stats.json' }]);

	config
		.plugin('react-loadable-stats')
		.use(ReactLoadablePlugin, [
			{ filename: path.join(outDir, 'react-loadable.json') }
		]);

	config
		.plugin('nice-log')
		.use(webpackNiceLog, [{ name: 'client', skipBuildTime: isProd }]);

	applyChainWebpack(siteConfig.chainWebpack, config, false);

	return config;
};
