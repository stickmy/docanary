const { normalizeUrl } = require('./util');

function genNavbarLink(baseUrl, link) {
	return normalizeUrl([baseUrl, link]);
}

module.exports = function resolveNavbarLinks({ siteConfig }) {
	const { navbarLinks, baseUrl } = siteConfig;

	if (!navbarLinks || navbarLinks.length === 0) {
		return [];
	}

	const navbarLinksMetadata = navbarLinks.map(({ label, link, href }) => {
		if (href) {
			return { label, href };
		}

		return {
			label,
			link: genNavbarLink(baseUrl, link),
		};
	});

	return navbarLinksMetadata;
};
