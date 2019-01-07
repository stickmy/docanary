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

	const sidebarLinks = Object.values(docsMetadatas).sort((prev, next) => {
		if (!prev.date || !next.date) return false;
		const prevDate = +new Date(prev.date);
		const nextDate = +new Date(next.date);
		return prevDate - nextDate > 0 ? -1 : 1;
	})

	return { docsMetadatas, sidebarLinks };
};
