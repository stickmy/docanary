const container = require('markdown-it-container');

module.exports = md => {
	md.use(...createContainer('tip', 'TIP'))
		.use(...createContainer('warning', 'WARNING'))
		.use(...createContainer('danger', 'DANGER'))
}

function createContainer(name, defaultTitle) {
	return [
		container,
		name,
		{
			render(tokens, idx) {
				const token = tokens[idx];
				const info = token.info.trim().slice(name.length).trim();
				if (token.nesting === 1) {
					return `<div class="${name} container-block"><p class="container-block-title">${info ||
						defaultTitle}</p>\n`;
				} else {
					return `</div>\n`;
				}
			},
		},
	];
}
