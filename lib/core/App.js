import React, { useState } from 'react';
import { renderRoutes } from 'react-router-config';

import DocanaryContext from '@docanary/context';
import palette from '@generated/palette';
import routes from '@generated/routes';
import docsMetadatas from '@generated/docsMetadatas';
import navbarLinks from '@generated/navbarLinks';
import sidebarLinks from '@generated/sidebarLinks';
import siteConfig from '@generated/siteConfig';

import { useChangeCSSVariable } from '@theme/utils';

const props = {
	palette,
	routes,
	docsMetadatas,
	siteConfig,
	navbarLinks,
	sidebarLinks,
};

function App() {
	const [context, setContext] = useState({});

	useChangeCSSVariable(palette);

	return (
		<DocanaryContext.Provider value={{ ...props, ...context, setContext }}>
			{renderRoutes(routes)}
		</DocanaryContext.Provider>
	);
}

export default App;
