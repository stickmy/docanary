const globby = require('globby');
const fs = require('fs-extra');
const resolveMetadata = require('./metadata');

module.exports = async function loadPages({ siteDir, siteConfig, pagesDir }) {
	const pagesMetadatas = {};

	if (!fs.existsSync(pagesDir)) {
		return { pagesMetadatas };
	}

	const pageFiles = await globby(['**/*.md'], {
		cwd: pagesDir,
	});

	await Promise.all(
		pageFiles.map(async source => {
			const metadata = await resolveMetadata(siteConfig, source, pagesDir);
			if (metadata) {
				pagesMetadatas[metadata.permalink] = metadata;
			}
		}),
	);

	return { pagesMetadatas };
};
