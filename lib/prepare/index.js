const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const loadSiteConfig = require('./loadSiteConfig');
const { generate } = require('./util');

module.exports = async function prepare(siteDir, deleteCache = true) {
	const siteConfig = loadSiteConfig(siteDir);

	await generate(
		'siteConfig.js',
		`export default ${JSON.stringify(siteConfig, null, 2)}`
	);
};
