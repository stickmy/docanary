const fm = require('front-matter');
const { getOptions } = require('loader-utils')
const md = require('./markdown');

module.exports = function(fileString) {
	const { body: content } = fm(fileString);

	// for markdown re-used
	const options = getOptions(this);
	let { markdown } = options;
	if (!markdown) {
		markdown = md();
	}
	const { html } = markdown.render(content);

	return html;
}


