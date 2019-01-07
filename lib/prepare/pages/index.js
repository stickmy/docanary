const globby = require('globby');
const resolveMetadata = require('./metadata');

module.exports = async function loadPages({ siteDir, siteConfig, pagesDir }) {
	const pageFiles = await globby(['**/*.md'], {
		cwd: pagesDir,
	});

	const pagesMetadatas = {};

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
