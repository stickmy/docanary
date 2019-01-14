import React, { useState, useContext } from 'react';
import { renderRoutes } from 'react-router-config';
import PageLayout from '@theme/Layout/pageLayout';
import DocanaryContext from '@docanary/context';
import Helmet from '@docanary/Helmet';
import PageContext from './pageContext';
import styles from './index.styl?module';

function Page(props) {
	const { route } = props;

	const { siteConfig = {} } = useContext(DocanaryContext);

	const [context, setContext] = useState({ pageMetadata: {} });

	const { pageMetadata } = context;

	const { baseUrl, favicon } = siteConfig;

	return (
		<PageLayout>
			<PageContext.Provider value={{ ...context, setContext }}>
				<Helmet>
					<title>
						{(pageMetadata && pageMetadata.title) || siteConfig.title}
					</title>
					{favicon && <link rel="shortcut icon" href={baseUrl + favicon} />}
				</Helmet>
				<div id="page-container" className={styles.pageContainer}>
					{renderRoutes(route.routes)}
				</div>
			</PageContext.Provider>
		</PageLayout>
	);
}

export default Page;
