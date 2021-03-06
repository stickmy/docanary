// TODO: Support lineNumbers in multiple code block.
// Rewrite fence method. Take token.info to identify lineNumbers option.
// The gramma may be like this: ``` :n

module.exports = md => {
	const fence = md.renderer.rules.fence;
	md.renderer.rules.fence = (...args) => {
		const rawCode = fence(...args);
		const code = rawCode.slice(
			rawCode.indexOf('<code>'),
			rawCode.indexOf('</code>'),
		);

		const lines = code.split('\n');
		const lineNumberCode = [...Array(lines.length - 1)]
			.map((_, index) => `<span class='line-number'>${index + 1}</span><br>`)
			.join('');

		const lineWrapper = `<div class='line-numbers-wrapper'>${lineNumberCode}</div>`;

		const finalCode = rawCode
			.replace('<!--beforeend-->', `${lineWrapper}<!--beforeend-->`)
			.replace('language-mode', 'line-numbers-mode');

		return finalCode;
	};
};
