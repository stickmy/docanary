import React, { useState, useContext } from 'react';
import Layout from '@theme/Layout';
import Helmet from '@docanary/Helmet';
import SideBar from '@theme/SideBar';
import PostHeaders from '@theme/Post/headers';
import PostContext from '@theme/SideBar/postContext';
import DocanaryContext from '@docanary/context';
import { renderRoutes } from 'react-router-config';
import { matchPath, Redirect } from 'react-router-dom';
import styles from './index.styl?module';

function Doc(props) {
	const { route, location } = props;
	const { sidebarLinks, siteConfig = {} } = useContext(DocanaryContext);
	// Current post metadata.
	const [context, setContext] = useState({ postMetadata: {} });

	const { postMetadata } = context;

	const matchedResult = matchPath(location.pathname, { path: route.path });

	function renderPostRoutes() {
		// If current route match Doc path exactly, redirect to the first post.
		if (matchedResult && matchedResult.isExact && route.routes.length > 0) {
			const firstPost = sidebarLinks[0].permalink;
			return <Redirect to={firstPost} />;
		}
		return renderRoutes(route.routes);
	}

	const { favicon, baseUrl } = siteConfig;

	return (
		<Layout>
			<PostContext.Provider value={{ ...context, setContext }}>
				<Helmet>
					<title>
						{(postMetadata && postMetadata.title) || siteConfig.title}
					</title>
					{favicon && <link rel="shortcut icon" href={baseUrl + favicon} />}
				</Helmet>
				<SideBar />
				<div id="doc-container" className={styles['doc-container']}>
					{renderPostRoutes()}
				</div>
				<PostHeaders />
			</PostContext.Provider>
		</Layout>
	);
}

export default Doc;
