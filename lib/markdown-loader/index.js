const fm = require('front-matter');
const { getOptions } = require('loader-utils')
const md = require('./markdown');

module.exports = function(fileString) {
	const { body } = fm(fileString);

	// for markdown re-used
	const options = getOptions(this);
	let { markdown } = options;
	if (!markdown) {
		markdown = md();
	}

	const html = markdown.render(body);

	return `
		import React from 'react';
		export default () => (
			<div>
				<div dangerouslySetInnerHTML={{ __html: ${JSON.stringify(html)} }} />
			</div>
		);
	`;
}


