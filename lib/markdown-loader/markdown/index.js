const Config = require('markdown-it-chain');
const anchorPlugin = require('markdown-it-anchor');
const highlight = require('./highlight');

module.exports = function(markdown = {}) {
	const config = new Config();

	config.options
		.html(true)
		.highlight(highlight)
		.end()
		.plugin('anchor')
		.use(anchorPlugin, [
			Object.assign(
				{
					permalink: true,
					permalinkBefore: true,
					permalinkSymbol: '#',
				},
				{},
			),
		])
		.end();

	const md = config.toMd(require('markdown-it'), markdown);

	return md;
};
