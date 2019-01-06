const globby = require('globby');
const resolveMetadata = require('./metadata');

module.exports = async function loadDocs({ siteDir, siteConfig, docsDir }) {
	const docsFiles = await globby(['**/*.md'], {
		cwd: docsDir
	});

	const docsMetadatas = {};

	await Promise.all(
		docsFiles.map(async source => {
			const metadata = await resolveMetadata(siteConfig, source, docsDir);
			docsMetadatas[metadata.id] = metadata;
		})
	);

	return { docsMetadatas };
};
