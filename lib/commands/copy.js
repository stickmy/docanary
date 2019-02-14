const fs = require('fs-extra');
const path = require('path');
const { logger } = require('../utils');

module.exports = async function eject(siteDir) {
	const defaultTheme = path.resolve(__dirname, '..', 'theme');
	const customTheme = path.resolve(siteDir, 'theme');
	await fs.copy(customTheme, defaultTheme);

	logger.success(`Copied custom theme files to default theme.\n`);
};
