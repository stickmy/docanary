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
