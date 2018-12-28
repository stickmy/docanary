const path = require('path');
const { normalizeUrl } = require('./util');

function getRoutePath(docsBaseUrl, metadata) {
	const { permalink, refPath } = metadata;
	if (permalink) {
		return normalizeUrl([docsBaseUrl, permalink]);
	}

	return path.join(docsBaseUrl, refPath);
}

function genRoutesConfig({ siteConfig = {}, docsMetadatas = {} }) {
	const { docsUrl, baseUrl } = siteConfig;

	const rootDocsUrl = normalizeUrl([baseUrl, docsUrl]);

	function genDocsRoute(metadata) {
		const { source } = metadata;
		const routePath = getRoutePath(rootDocsUrl, metadata);
		return `{
			path: '${routePath}',
			exact: true,
			component: Loadable({
				loader: () => import(/* webpackPrefetch: true */ '${source}'),
				loading: Loading,
				render(loaded, props) {
					let Content = loaded.default;
					return (
						<DocBody {...props} metadata={${JSON.stringify(metadata)}}>
							<Content />
						</DocBody>
					)
				}
			})
		}`;
	}

	const docsRoutes = `{
		path: '${rootDocsUrl}',
		component: Doc,
		routes: [
			${Object.values(docsMetadatas)
				.map(genDocsRoute)
				.join(',')}
		]
	}`;

	return (
		`import React from 'react';\n` +
		`import Loadable from 'react-loadable';\n` +
		`import Loading from '@theme/Loading';\n` +
		`import Doc from '@theme/Doc';\n` +
		`import DocBody from '@theme/DocBody';\n` +
		`const routes = [
			${docsRoutes}\n];\n` +
		`export default routes;\n`
	);
}

module.exports = genRoutesConfig;
