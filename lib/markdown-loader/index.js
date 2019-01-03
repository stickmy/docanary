const fm = require('front-matter');
const { getOptions } = require('loader-utils');
const md = require('./markdown');

let mdIt;

module.exports = function(fileString) {
	const { body } = fm(fileString);

	// for markdown re-used
	const options = getOptions(this);
	const { markdown } = options;

	if (!mdIt) {
		mdIt = md(markdown);
	}

	const html = mdIt.render(body);

	return `
		import React from 'react';
		import Markdown from '@theme/Markdown';
		export default () => (
			<Markdown>
				<div className='post-content' dangerouslySetInnerHTML={{ __html: ${JSON.stringify(html)} }} />
			</Markdown>
		);
	`;
};
