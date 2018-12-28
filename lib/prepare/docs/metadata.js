const path = require('path');
const fs = require('fs-extra');
const { parse, normalizeUrl } = require('../util');
const md = require('../../markdown-loader/markdown');
const { extractHeader } = require('../../markdown-loader/markdown/utils');

const markdown = md();

function fileToUrl(fileName) {
	return fileName.replace(/\.md$/, '');
}

function getPermaLink(docsBaseUrl, source, permalink) {
	if (permalink) {
		return normalizeUrl([docsBaseUrl, permalink]);
	}
	const fileNameUrl = fileToUrl(source);

	return normalizeUrl([docsBaseUrl, fileNameUrl]);
}

module.exports = async function resolveMetadata(siteConfig, source, docsDir) {

	const filepath = path.resolve(docsDir, source);
	const fileString = await fs.readFile(filepath, 'utf8');
	const { metadata, content } = parse(fileString);

	if (!metadata.id) {
		// e.g. hello.module.css -> hello.module
		metadata.id = path.basename(source, path.extname(source));
	}

	if (metadata.id.includes('/')) {
		throw new Error('Document id cannot include "/"');
	}

	if (!metadata.title) {
		metadata.title = metadata.id;
	}

	metadata.headers = extractHeader(content, ['h2', 'h3'], markdown);

	const { baseUrl, docsUrl } = siteConfig;
	const rootDocsUrl = normalizeUrl([baseUrl, docsUrl]);

	metadata.permalink = getPermaLink(rootDocsUrl, source, metadata.permalink);

	metadata.source = path.join(docsDir, source);

	return metadata;
};
