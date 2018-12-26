const path = require('path');
const Config = require('webpack-chain');
const ExtractCssPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MarkdownLoader = require.resolve('../markdown-loader');

const CSS_RE = /\.css$/;

const CSS_MODULE_RE = /\.module\.css$/;

function applyBabel(rule, { isServer }) {
	rule
		.use('babel')
		.loader('babel-loader')
		.options({
			babelrc: false,
			presets: ['@babel/env', '@babel/react'],
			plugins: [
				isServer ? 'dynamic-import-node' : '@babel/syntax-dynamic-import',
				'react-loadable/babel',
			],
		});
}

function applyCss(cssRule, { options, isServer, isProd }) {
	if (!isServer) {
		if (isProd) {
			cssRule.use('extract-css-loader').loader(ExtractCssPlugin.loader);
		} else {
			cssRule.use('style-loader').loader('style-loader');
		}
	}

	cssRule
		.use('css-loader')
		.loader(isServer ? 'css-loader/locals' : 'css-loader')
		.options(options);

	return cssRule;
}

module.exports = function createBaseConfig(options, isServer) {
	const isProd = process.env.NODE_ENV === 'production';

	const { outDir, baseUrl, siteDir } = options;

	const config = new Config();

	config
		.mode(isProd ? 'production' : 'development')
		.output.path(outDir)
		.filename(isProd ? '[name].[chunkhash:8].js' : '[name].js')
		.publicPath(isProd ? baseUrl : '/');

	config.resolveLoader.modules.add(
		path.resolve(__dirname, '../../node_modules'),
	);

	if (!isProd) {
		config.devtool('cheap-module-eval-source-map');
	}

	config.resolve
		.set('symlinks', true)
		.alias.set('@utils', path.resolve(__dirname, '../utils'))
		.set('@core', path.resolve(__dirname, '../core'))
		.set('@generate', path.resolve(__dirname, '../core/generated'))
		.set('@docanary', path.resolve(__dirname, '../docanary'))
		.set('@site', siteDir)
		.end()
		.modules.add(path.resolve(__dirname, '../../node_module'))
		.add(path.resolve(siteDir, 'node_modules'));

	const jsRule = config.module
		.rule('js')
		.test(/\.jsx?$/)
		.exclude.add(filepath => {
			// don't exclude our own lib directory
			if (filepath.startsWith(path.join(__dirname, '..'))) {
				return false;
			}

			return /node_module/.test(filepath);
		})
		.end();

	applyBabel(jsRule, { isServer });

	const mdRule = config.module.rule('markdown').test(/\.md$/);

	applyBabel(mdRule, { isServer });

	mdRule
		.use('markdown-loader')
		.loader(MarkdownLoader)
		.options({});

	const cssRule = config.module
		.rule('css')
		.test(CSS_RE)
		.exclude.add(CSS_MODULE_RE)
		.end();

	applyCss(cssRule, {
		options: {
			importLoaders: 1,
			sourceMap: !isProd,
			minimize: true,
		},
		isProd,
		isServer,
	});

	const cssModuleRule = config.module.rule('css-module').test(CSS_MODULE_RE);

	applyCss(cssModuleRule, {
		options: {
			modules: true,
			localIdentName: '[local]_[hash:base64:8]',
			importLoaders: 1,
			sourceMap: !isProd,
			minimize: true,
		},
		isProd,
		isServer,
	});

	config.plugin('extract-css').use(ExtractCssPlugin, [
		{
			filename: isProd ? '[name].[chunkhash].css' : '[name.css]',
			chunkFilename: isProd ? '[id].[chunkhash].css' : '[id].css',
		},
	]);

	if (isProd) {
		config.optimization.minimizer([
			new TerserPlugin({
				cache: true,
				parallel: true,
				sourceMap: true,
				terserOptions: {
					ecma: 6,
					mangle: true,
					output: { comments: false },
				},
			}),
		]);
	}

	return config;
};
