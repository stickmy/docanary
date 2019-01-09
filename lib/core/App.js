import React, { useState } from 'react';
import { renderRoutes } from 'react-router-config';

import DocanaryContext from '@docanary/context';
import routes from '@generated/routes';
import docsMetadatas from '@generated/docsMetadatas';
import navbarLinks from '@generated/navbarLinks';
import sidebarLinks from '@generated/sidebarLinks';
import siteConfig from '@generated/siteConfig';

const props = {
	routes,
	docsMetadatas,
	siteConfig,
	navbarLinks,
	sidebarLinks,
};

function App() {
	const [context, setContext] = useState({});
	return (
		<DocanaryContext.Provider value={{ ...props, ...context, setContext }}>
			{renderRoutes(routes)}
		</DocanaryContext.Provider>
	);
}

export default App;
