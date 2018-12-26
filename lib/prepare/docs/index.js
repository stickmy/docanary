const path = require('path');
const globby = require('globby');
const resolveMetadata = require('./metadata');

module.exports = async function loadDocs({ siteDir, siteConfig, docsDir }) {
	const docsFiles = await globby(['**/*.md'], {
		cwd: docsDir
	});

	const docsMetadata = {};

	await Promise.all(
		docsFiles.map(async source => {
			const metadata = await resolveMetadata(source, docsDir);
			docsMetadata[metadata.id] = metadata;
		})
	);

	return { docsMetadata };
};
