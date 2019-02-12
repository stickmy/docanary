const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

module.exports = async function eject(siteDir) {
	const defaultTheme = path.resolve(__dirname, '..', 'theme');
  const customTheme = path.resolve(siteDir, 'theme');
  await fs.copy(customTheme, defaultTheme);

  console.log(
    `\n${chalk.green('Success!')} Copied custom theme files to default theme.\n`,
  );
}