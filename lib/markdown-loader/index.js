const fm = require('front-matter');
const { getOptions } = require('loader-utils');
const { logger } = require('../utils');
const md = require('./markdown');

let mdIt;

const COMMON_RE = /<!--InjectComponentStart:(.*?)?-->/gm;

module.exports = function(fileString) {
	const { body, attributes } = fm(fileString);

	const options = getOptions(this);
	const { markdown, injectComponents, experimental } = options;

	if (!mdIt) {
		mdIt = md(markdown);
	}

	let html = mdIt.render(body);

	const injectComponentNames = [];

	let matchedResult;
	while ((matchedResult = COMMON_RE.exec(html)) !== null) {
		const componentName = matchedResult[1];
		if (injectComponents.indexOf(componentName) < 0) {
			const post = attributes.title;
			logger.warn(
				`find unregistered component: ${componentName} in [${post}]`,
			);
		} else {
			injectComponentNames.push(componentName);
		}
	}

	logger.debug('injectComponents: ', injectComponentNames);

	// TODO: support eventHandler for inject component.
	// Currently, render to staticMarkup is supported only.

	return `
		import React from 'react';
		import ReactDOM from 'react-dom';
		import escapeHtml from 'escape-html';
		import Markdown from '@theme/Markdown';
		import componentsMap from '@generated/componentsMap';
		import { renderToStaticMarkup } from 'react-dom/server';

		let markupHtml;
		if (!${experimental}) {
			markupHtml = ${JSON.stringify(html)};
		} else {
			const unescapeHtml = html =>
			String(html)
				.replace(/&amp;/g, '&')
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
			});
			markupHtml = unescapeHtml(html);
		}

		export default () => (
			<Markdown>
				<div className='post-content' dangerouslySetInnerHTML={{ __html: markupHtml }} />
			</Markdown>
		);
	`;
};
