const fs = require('fs-extra');
const path = require('path');
const fm = require('front-matter');

// if generated folder not exist, create it
const generatePath = path.resolve(__dirname, '../core/generated');
fs.ensureDirSync(generatePath);

const generateCache = new Map();

exports.generate = async function(file, content) {
	const cached = generateCache.get(file);
	if (cached !== content) {
		await fs.writeFileSync(path.join(generatePath, file), content);
		generateCache.set(file, content);
	}
};

exports.parse = function(source) {
	if (!fm.test(source)) {
		return { metadata: null, content: source };
	}
	const { attributes: metadata, body: content } = fm(source);
	return { metadata, content };
};

exports.normalizeUrl = function(rawUrls) {
	const urls = rawUrls;
	const result = [];

	// first part is protocol
	if (urls[0].match(/^[^/:]+:\/*$/) && urls.length > 1) {
		const first = urls.shift();
		urls[0] = first + urls[0];
	}

	// three slashes in the file protocol.   e.g. file:///// -> file:///
	// two slashed in anything else.  e.g. http://// -> http://
	if (urls[0].match(/^file:\/\/\//)) {
		urls[0] = urls[0].replace(/^([^/:]+):\/*/, '$1:///');
	} else {
		urls[0] = urls[0].replace(/^([^/:]+):\/*/, '$1://');
	}

	for (let i = 0; i < urls.length; i++) {
		let component = urls[i];

		if (typeof component !== 'string') {
			throw new TypeError(`Url must be a string. Reveiced ${component}`);
		}

		if (component === '') {
			// eslint-disable-next-line
			continue;
		}

		if (i > 0) {
			// Removing the starting shashed for each component but not the first.
			component = component.replace(/^[/]+/, '');
		}
		if (i < urls.length - 1) {
			// Removing the ending slashed for each component but not the last.
			component = component.replace(/[/]+$/, '');
		} else {
			// For the last component, combine mutliple slashes to a single one.
			component = component.replace(/[/]+$/, '/');
		}

		result.push(component);
	}

	let str = result.join('/');

	// remove trailing slashed before params or hash
	str = str.replace(/\/(\?|&|#[^!])/g, '$1');

	// replace mutli ? in prams with &
	const parts = str.split('?');
	str = parts.shift() + (parts.length > 0 ? '?' : '') + parts.join('&');

	str = str.replace(/^\/+/, '/');

	return str;
};
