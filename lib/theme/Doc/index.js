import React, { useState } from 'react';
import Layout from '@theme/Layout';
import SideBar from '@theme/SideBar';
import PostHeaders from '@theme/Post/headers';
import PostContext from '@theme/SideBar/postContext';
import { renderRoutes } from 'react-router-config';
import styles from './index.styl?module';

function Doc(props) {
	const { route } = props;
	const [context, setContext] = useState({ postMetadata: {} });

	return (
		<Layout>
			<PostContext.Provider value={{ ...context, setContext }}>
				<SideBar />
				<div id="doc-container" className={styles['doc-container']}>
					{renderRoutes(route.routes)}
				</div>
				<PostHeaders />
			</PostContext.Provider>
		</Layout>
	);
}

export default Doc;
