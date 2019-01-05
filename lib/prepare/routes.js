const { normalizeUrl } = require('./util');

function genRoutesConfig({ siteConfig = {}, docsMetadatas = {} }) {
	const { docsUrl, baseUrl } = siteConfig;

	const rootDocsUrl = normalizeUrl([baseUrl, docsUrl]);

	function genDocsRoute(metadata) {
		const { source, permalink } = metadata;
		return `{
			path: '${permalink}',
			exact: true,
			component: Loadable({
				loader: () => import(/* webpackPrefetch: true */ '${source}'),
				loading: Loading,
				render(loaded, props) {
					let Content = loaded.default;
					return (
						<Post {...props} metadata={${JSON.stringify(metadata)}}>
							<Content />
						</Post>
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

	const NotFoundRoute = `
	{
		path: '*',
		component: NotFound
	}`;

	return (
		`import React from 'react';\n` +
		`import Loadable from 'react-loadable';\n` +
		`import Loading from '@theme/Loading';\n` +
		`import Doc from '@theme/Doc';\n` +
		`import Post from '@theme/Post';\n` +
		`import NotFound from '@theme/NotFound';\n` +
		`const routes = [
			${docsRoutes},
			${NotFoundRoute}\n];\n` +
		`export default routes;\n`
	);
}

module.exports = genRoutesConfig;
