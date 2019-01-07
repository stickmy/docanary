const path = require('path');
const fs = require('fs-extra');
const { parse, normalizeUrl } = require('../util');

// e.g. pages/about/index.md -> /about
function fileToUrl(fileName) {
	return fileName.replace(/\.md$/, '').replace(/\/index$/, '');
}

function getPermaLink(baseUrl, source, permalink) {
	if (permalink) {
		return normalizeUrl([baseUrl, permalink]);
	}
	const fileNameUrl = fileToUrl(source);

	return normalizeUrl([baseUrl, fileNameUrl]);
}

module.exports = async function resolveMetadata(siteConfig, source, pagesDir) {
	const filepath = path.resolve(pagesDir, source);
	const fileString = await fs.readFile(filepath, 'utf8');
	const { metadata } = parse(fileString);

	if (!metadata) return;

	if (!metadata.id) {
		metadata.id = path.basename(source, path.extname(source));
	}

	if (metadata.id.includes('/')) {
		throw new Error('Document id cannot include "/"');
	}

	if (!metadata.title) {
		metadata.title = metadata.id;
	}

	if (!metadata.actions) {
		metadata.actions = [];
	}

	const { baseUrl } = siteConfig;

	metadata.actions = metadata.actions.map(action => {
		if (action.href) return action;
		return { ...action, link: normalizeUrl([baseUrl, action.link]) };
	});

	if (!metadata.features) {
		metadata.features = [];
	}

	metadata.permalink = getPermaLink(baseUrl, source, metadata.permalink);

	metadata.source = path.join(pagesDir, source);

	return metadata;
};
