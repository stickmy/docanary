const LRU = require('lru-cache');
const deeplyParseHeaders = require('./deeplyParseHeaders');

const cache = new LRU({ max: 1000 });

module.exports = (content, range, md) => {
	const key = content + range.join(',');
	const hit = cache.get(key);
	if (hit) return hit;

	const tokens = md.parse(content, {});

	const res = tokens.reduce((acc, t, index) => {
		if (t.type === 'heading_open' && range.includes(t.tag)) {
			const title = tokens[index + 1].content;
			const slug = t.attrs.find(([name]) => name === 'id')[1];

			acc.push({
				title: deeplyParseHeaders(title),
				level: parseInt(t.tag.slice(1), 10), // e.g. tag: <h2>
				slug: slug || md.slugify(title),
			});
		}
		return acc;
	}, []);

	cache.set(key, res);

	return res;
};
