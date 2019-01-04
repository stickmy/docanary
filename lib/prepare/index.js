const path = require('path');
const loadSiteConfig = require('./siteConfig');
const { generate } = require('./util');
const { Logger } = require('../utils');
const loadDocs = require('./docs');
const loadHeaderLinks = require('./headerLinks');
const genRoutesConfig = require('./routes');

const log = new Logger();

module.exports = async function prepare(siteDir, deleteCache = true) {
	const siteConfig = loadSiteConfig(siteDir);

	let docsReletive = siteConfig.docsDir || siteConfig.defaultDocsPath;
	const docsDir = path.resolve(siteDir, docsReletive);

	if (!siteConfig.docsDir) {
		log.info(`apply default docs path: ${docsDir}`);
	}

	await generate(
		'siteConfig.js',
		`export default ${JSON.stringify(siteConfig, null, 2)}`,
	);

	const { docsMetadatas } = await loadDocs({ siteDir, siteConfig, docsDir });
	await generate(
		'metadatas.js',
		`export default ${JSON.stringify(docsMetadatas, null, 2)}`,
	);

	const headerLinks = loadHeaderLinks({ siteConfig });
	await generate(
		'headerLinks.js',
		`export default ${JSON.stringify(headerLinks, null, 2)}`,
	);

	const routesConfig = await genRoutesConfig({ docsMetadatas, siteConfig });
	await generate('routes.js', routesConfig);

	const outDir = path.resolve(siteDir, 'build');

	const { baseUrl } = siteConfig;

	const options = {
		siteConfig,
		siteDir,
		outDir,
		docsMetadatas,
		headerLinks,
		baseUrl,
	};

	return options;
};
