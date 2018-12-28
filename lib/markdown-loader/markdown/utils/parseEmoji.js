const emojiJSON = require('markdown-it-emoji/lib/data/full.json');

module.exports = str => {
	return String(str).replace(
		/:(.+?):/g,
		(placeholder, key) => emojiJSON[key] || placeholder,
	);
};
