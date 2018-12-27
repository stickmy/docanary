const removeDiacritics = require('diacritics').remove;

const ctrlRE = /[\u0000-\u001f]/g;
const specRE = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g;

module.exports = function slugify(str) {
	return (
		removeDiacritics(str)
			// Remove control characters
			.replace(ctrlRE, '')
			// Replace special characters
			.replace(specRE, '-')
			// Remove continous separators
			.replace(/\-{2,}/g, '-')
			// Remove prefixing and trailing separtors
			.replace(/^\-+|\-+$/g, '')
			// ensure it doesn't start with a number
			.replace(/^(\d)/, '_$1')
			// lowercase
			.toLowerCase()
	);
};
