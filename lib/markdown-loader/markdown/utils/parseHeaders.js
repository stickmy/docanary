const compose = require('./compose');
const unescapeHtml = require('./unescapeHtml');
const parseEmoji = require('./parseEmoji');

const removeMarkdownTokens = str =>
	String(str)
		.replace(/\[(.*)\]\(.*\)/, '$1') // [](TAG) => TAG
		.replace(/(`|_|\*{1,3})(.*?[^\\])\1/g, '$2') // `{t}` | *{t}* | **{t}** | ***{t}*** | _{t}_ => t
		.replace(/(\\)(\*|_|`|\!)/g, '$2');

const trim = str => str.trim();

module.exports = compose(
	unescapeHtml,
	parseEmoji,
	removeMarkdownTokens,
	trim,
);
