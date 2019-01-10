function hyphen(key) {
	return key.replace(/([A-Z])/g, '-$1').toLowerCase();
}

module.exports = function palette({ siteConfig }) {
	const { palette } = siteConfig;

	if (!palette) {
		return {};
	}

	const hyphenPalette = Object.keys(palette).reduce((map, key) => {
		const value = palette[key];
		const hyphenKey = hyphen(key);
		map[`--${hyphenKey}`] = value;
		return map;
	}, {});

	return hyphenPalette;
};
