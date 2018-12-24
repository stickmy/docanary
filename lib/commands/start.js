const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const portfinder = require('portfinder');
const webpack = require('webpack');
const serve = require('webpack-serve');

function getHost(host) {
	return host || 'localhost';
}

async function getPort(port) {
	portfinder.basePort = parseInt(port, 10) || 3000;
	const port = await portfinder.getPortPromise();
	return port;
}

module.exports = async function start(siteDir, cliOptions = {}) {
	const port = await getPort(cliOptions.port);
	const hotPort = await getPort(port + 1);

	const host = getHost(cliOptions.host);
};
