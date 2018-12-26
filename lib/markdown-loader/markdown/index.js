const Config = require('markdown-it-chain');
const highlight = require('./highlight');

module.exports = function(markdown = {}) {
	const config = new Config();

	config.options
		.html(true)
		.highlight(highlight)
		.end();

	const md = config.toMd(require('markdown-it'), markdown);

	return md;
};
