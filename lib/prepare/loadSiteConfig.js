const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

module.exports = function loadSiteConfig(siteDir, deleteCache = true) {
	const configPath = path.resolve(siteDir, 'siteConfig.js');

	if (deleteCache) {
		delete require.cache[configPath];
	}

	let config = {};
	if (fs.existsSync(configPath)) {
		config = require(configPath);
	}

	console.log(chalk.cycan(`read docs path: ${config.docsPath}`));

	return config;
}