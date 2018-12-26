const path = require('path');
const fs = require('fs-extra');
const loadSiteConfig = require('./loadSiteConfig');
const { generate } = require('./util');
const { Logger } = require('../utils');
const loadDocs = require('./docs');

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
		`export default ${JSON.stringify(siteConfig, null, 2)}`
	);

	const { docsMetadata } = await loadDocs({ siteDir, siteConfig, docsDir });

	await generate(
		'metadata.js',
		`export default ${JSON.stringify(docsMetadata, null, 2)}`
	);

	const outDir = path.resolve(siteDir, 'build');

	const { baseUrl } = siteConfig;

	const options = {
		siteConfig,
		siteDir,
		outDir,
		docsMetadata,
		baseUrl,
	};

	return options;
};
