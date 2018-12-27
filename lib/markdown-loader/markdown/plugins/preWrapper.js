module.exports = md => {
	const fence = md.renderer.rules.fence;
	md.renderer.rules.fence = (...args) => {
		const [tokens, idx] = args;
		const token = tokens[idx];
		const rawCode = fence(...args);
		return (
			`<!--beforebegin--><div class='language-${token.info.trim()} language-mode'>` +
			`<!--afterbegin-->${rawCode}<!--beforeend--></div><!--afterend-->`
		);
	};
};
