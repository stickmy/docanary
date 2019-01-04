const { normalizeUrl } = require('./util');

function genHeaderLink(baseUrl, link) {
	return normalizeUrl([baseUrl, link]);
}

module.exports = function resolveHeaderLinks({ siteConfig }) {
	const { headerLinks, baseUrl } = siteConfig;

	if (!headerLinks || headerLinks.length === 0) {
		return [];
	}

	const headerLinksMetadata = headerLinks.map(({ label, link }) => {
		return {
			label,
			link: genHeaderLink(baseUrl, link),
		};
	});

	return headerLinksMetadata;
};
