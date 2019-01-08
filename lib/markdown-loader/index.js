const fm = require('front-matter');
const { getOptions } = require('loader-utils');
const md = require('./markdown');

let mdIt;

const COMMON_RE = /<!--InjectComponentStart:(.*)?-->/mg;

module.exports = function(fileString) {
	const { body } = fm(fileString);

	// for markdown re-used
	const options = getOptions(this);
	const { markdown } = options;

	if (!mdIt) {
		mdIt = md(markdown);
	}

	let html = mdIt.render(body);

	const injectComponentNames = [];

	let matchedResult;

	while ((matchedResult = COMMON_RE.exec(html)) !== null) {
		injectComponentNames.push(matchedResult[1]);
	}

	return `
		import React from 'react';
		import escapeHtml from 'escape-html';
		import Markdown from '@theme/Markdown';
		import componentsMap from '@generated/componentsMap';
		import { renderToStaticMarkup } from 'react-dom/server';

		const unescapeHtml = html =>
			String(html)
				.replace(/&quot;/g, '"')
				.replace(/&#39;/g, "'")
				.replace(/&#x3A;/g, ':')
				.replace(/&lt;/g, '<')
				.replace(/&gt;/g, '>');

		let html = escapeHtml(${JSON.stringify(html)});

		${JSON.stringify(injectComponentNames)}.forEach(name => {
			const Component = componentsMap[name];
			const componentRE = new RegExp(
				'(?<=(&lt;!--InjectComponentStart:' +
				name +
				'--&gt;))(.*[^\\\\\/])?(?=(&lt;!--InjectComponentEnd:' +
				name +
				'--&gt;))',
				'mg',
			);
			html = html.replace(componentRE, rawString => {
				const unescapeStr = unescapeHtml(rawString);
				const startIndex = unescapeStr.indexOf('<' + name +'>');
				const endIndex = unescapeStr.indexOf('</' + name + '>');
				const props = unescapeStr.substring(startIndex + name.length + 2, endIndex);
				return renderToStaticMarkup(<Component>{props}</Component>);
			});
		})
		html = unescapeHtml(html);
		export default () => (
			<Markdown>
				<div className='post-content' dangerouslySetInnerHTML={{ __html: html }} />
			</Markdown>
		);
	`;
};
