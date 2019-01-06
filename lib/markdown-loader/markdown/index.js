const Config = require('markdown-it-chain');
const anchorPlugin = require('markdown-it-anchor');
const highlight = require('./highlight');
const highlightLines = require('./plugins/highlightLine');
const lineNumbersPlugin = require('./plugins/lineNumbers');
const preWrapper = require('./plugins/preWrapper');
const container = require('./plugins/containers');
const injectComponent = require('./plugins/component');
const snippet = require('./plugins/snippet');
const PLUGIN_MAP = require('./plugins');
const { slugify: _slugify } = require('./utils');

module.exports = function(markdown = {}) {
	const { lineNumbers } = markdown;
	const config = new Config();

	config.options
		.html(true)
		.highlight(highlight)
		.end()
		.plugin('anchor')
		.use(anchorPlugin, [
			Object.assign(
				{
					slugify: _slugify,
					permalink: true,
					permalinkBefore: true,
					permalinkSymbol: '#',
				},
				{},
			),
		])
		.end();

	config
		.plugin(PLUGIN_MAP.INJECT_COMPONENT)
		.use(injectComponent)
		.end();

	config
		.plugin(PLUGIN_MAP.HIGHLIGHT_LINES)
		.use(highlightLines)
		.end();

	config
		.plugin(PLUGIN_MAP.PRE_WRAP)
		.use(preWrapper)
		.end();

	config
		.plugin(PLUGIN_MAP.SNIPPET)
		.use(snippet)
		.end();

	config
		.plugin(PLUGIN_MAP.CONTAINER)
		.use(container)
		.end();

	if (lineNumbers) {
		config
			.plugin(PLUGIN_MAP.LINE_NUMBER)
			.use(lineNumbersPlugin)
			.end();
	}

	const md = config.toMd(require('markdown-it'), markdown);

	return md;
};
