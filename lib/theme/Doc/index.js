import React from 'react';
import Layout from '@theme/Layout';
import SideBar from '@theme/SideBar';
import { renderRoutes } from 'react-router-config';
import styles from './index.styl?module';

function Doc(props) {
	const { route } = props;

	return (
		<Layout>
			<SideBar />
			<div className={styles['doc-container']}>{renderRoutes(route.routes)}</div>
		</Layout>
	);
}

export default Doc;
