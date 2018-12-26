const prism = require('prismjs');
const escapeHtml = require('escape-html');
const loadLanguages = require('prismjs/components/index');
const { Logger } = require('../../utils');

const log = new Logger();

loadLanguages(['markup', 'css', 'javascript']);

function wrap(code, lang) {
	if (lang === 'text') {
		code = escapeHtml(code);
	}
	return `<pre class="language-${lang}"><code>${code}</code></pre>`;
}

module.exports = function(str, lang) {
	if (!lang) {
		return wrap(str, 'text');
	}

	lang = lang.toLowerCase();
	const rawLang = lang;
	if (lang === 'html' || lang === 'vue') {
		lang = 'markup';
	}
	if (lang === 'md') {
		lang = 'markdown';
	}
	if (lang === 'ts') {
		lang = 'typescript';
	}
	if (lang === 'py') {
		lang = 'python';
	}
	if (!prism.languages[lang]) {
		try {
			loadLanguages([lang]);
		} catch (e) {
			log.warn(
				`prismjs syntax highlighting for language ${lang} is not supported.`,
			);
		}
	}
	if (prism.languages[lang]) {
		const code = prism.highlight(str, prism.languages[lang], lang);
		return wrap(code, rawLang);
	}
	return wrap(str, 'text');
};
