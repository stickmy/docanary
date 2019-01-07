import React from 'react';
import { renderRoutes } from 'react-router-config';
import PageLayout from '@theme/Layout/pageLayout';
import styles from './index.styl?module';

function Page(props) {
	const { route } = props;

	return (
		<PageLayout>
			<div id="page-container" className={styles.pageContainer}>
				{renderRoutes(route.routes)}
			</div>
		</PageLayout>
	);
}

export default Page;
