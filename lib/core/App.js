import React, { useState } from 'react';
import { renderRoutes } from 'react-router-config';

import DocanaryContext from '@docanary/context';
import routes from '@generated/routes';
import metadatas from '@generated/metadatas';
import siteConfig from '@generated/siteConfig';

const props = {
	routes,
	metadatas,
	siteConfig,
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
