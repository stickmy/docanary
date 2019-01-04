import React, { useState } from 'react';
import Layout from '@theme/Layout';
import SideBar from '@theme/SideBar';
import PostHeaders from '@theme/Post/headers';
import PostContext from '@theme/SideBar/postContext';
import { renderRoutes } from 'react-router-config';
import { matchPath, Redirect } from 'react-router-dom';
import styles from './index.styl?module';

function Doc(props) {
	const { route, location } = props;
	// Current post metadata.
	const [context, setContext] = useState({ postMetadata: {} });

	const matchedResult = matchPath(location.pathname, { path: route.path });

	function renderPostRoutes() {
		// If current route match Doc path exactly, redirect to the first post.
		if (matchedResult && matchedResult.isExact && route.routes.length > 0) {
			const firstPost = route.routes[0].path;
			return <Redirect to={firstPost} />;
		}
		return renderRoutes(route.routes);
	}

	return (
		<Layout>
			<PostContext.Provider value={{ ...context, setContext }}>
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
