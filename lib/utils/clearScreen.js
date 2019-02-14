'use strict';

module.exports = function clearScreen() {
	process.stdout.write('\x1Bc');
};
