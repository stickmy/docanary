const path = require('path');
const loadSiteConfig = require('./siteConfig');
const { generate } = require('./util');
const { Logger } = require('../utils');
const loadDocs = require('./docs');
const loadPages = require('./pages');
const loadComponents = require('./components');
const loadHeaderLinks = require('./headerLinks');
const genRoutesConfig = require('./routes');

const log = new Logger();

module.exports = async function prepare(siteDir, deleteCache = true) {
	const siteConfig = loadSiteConfig(siteDir);

	// Resolve docs path
	let docsRelative = siteConfig.docsDir || siteConfig.defaultDocsPath;
	const docsDir = path.resolve(siteDir, docsRelative);

	if (!siteConfig.docsDir) {
		log.info(`apply default docs path: ${docsDir}`);
	}

	// Resolve pages path
	let pagesRelative = siteConfig.pagesDir || siteConfig.defaultPagesPath;
	const pagesDir = path.resolve(siteDir, pagesRelative);

	if (!siteConfig.pagesDir) {
		log.info(`apply default pages path: ${pagesDir}`);
	}

	// Resolve components path
	let componentsRelative =
		siteConfig.componentsDir || siteConfig.defaultComponentsPath;
	const componentsDir = path.resolve(siteDir, componentsRelative);

	if (!siteConfig.componentsDir) {
		log.info(`apply default components path: ${componentsDir}`);
	}

	await generate(
		'siteConfig.js',
		`export default ${JSON.stringify(siteConfig, null, 2)}`,
	);

	const componentsMap = await loadComponents({
		siteDir,
		siteConfig,
		componentsDir,
		componentsRelative,
	});
	await generate('componentsMap.js', componentsMap);

	const { docsMetadatas, sidebarLinks } = await loadDocs({
		siteDir,
		siteConfig,
		docsDir,
	});
	await generate(
		'docsMetadatas.js',
		`export default ${JSON.stringify(docsMetadatas, null, 2)}`,
	);

	await generate(
		'sidebarLinks.js',
		`export default ${JSON.stringify(sidebarLinks, null, 2)}`,
	);

	const { pagesMetadatas } = await loadPages({ siteDir, siteConfig, pagesDir });
	await generate(
		'pagesMetadatas.js',
		`export default ${JSON.stringify(pagesMetadatas, null, 2)}`,
	);

	const headerLinks = loadHeaderLinks({ siteConfig });
	await generate(
		'headerLinks.js',
		`export default ${JSON.stringify(headerLinks, null, 2)}`,
	);

	const routesConfig = await genRoutesConfig({
		docsMetadatas,
		pagesMetadatas,
		siteConfig,
	});
	await generate('routes.js', routesConfig);

	const outDir = path.resolve(siteDir, 'build');

	const { baseUrl } = siteConfig;

	const options = {
		siteConfig,
		siteDir,
		outDir,
		docsMetadatas,
		pagesMetadatas,
		headerLinks,
		baseUrl,
	};

	return options;
};
