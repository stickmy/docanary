const path = require('path');
const loadSiteConfig = require('./siteConfig');
const { generate } = require('./util');
const { Logger } = require('../utils');
const loadDocs = require('./docs');
const loadPages = require('./pages');
const loadComponents = require('./components');
const loadNavbarLinks = require('./navbarLinks');
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

	// generate siteConfig.js
	await generate(
		'siteConfig.js',
		`export default ${JSON.stringify(siteConfig, null, 2)}`,
	);

	// generate componentsMap.js
	const { rawString, injectComponents } = await loadComponents({
		siteDir,
		siteConfig,
		componentsDir,
		componentsRelative,
	});
	await generate('componentsMap.js', rawString);

	// generate docsMetadatas.js & sidebarLinks.js
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

	// generate pagesMetadatas.js
	const { pagesMetadatas } = await loadPages({ siteDir, siteConfig, pagesDir });
	await generate(
		'pagesMetadatas.js',
		`export default ${JSON.stringify(pagesMetadatas, null, 2)}`,
	);

	// genreate navbarLinks.js
	const navbarLinks = loadNavbarLinks({ siteConfig });
	await generate(
		'navbarLinks.js',
		`export default ${JSON.stringify(navbarLinks, null, 2)}`,
	);

	// generate routes.js
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
		injectComponents,
		docsMetadatas,
		pagesMetadatas,
		navbarLinks,
		baseUrl,
	};

	return options;
};
