const path = require('path')
const fs = require('fs-extra')
const { parse } = require('../util')

module.exports = async function resolveMetadata(source, docsDir) {
	const filepath = path.resolve(docsDir, source);
	const fileString = await fs.readFile(filepath, 'utf8');
	const { metadata } = parse(fileString);

	if (!metadata.id) {
		// example: hello.module.css -> hello.module
		metadata.id = path.basename(source, path.extname(source));
	}

	if (metadata.id.includes('/')) {
		throw new Error('Document id cannot include "/"');
	}

	if (!metadata.title) {
		metadata.title = metadata.id;
	}

	metadata.source = path.join(docsDir, source);

	return metadata;
}