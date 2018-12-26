import { matchRoutes } from 'react-router-config';

// For server side render
export default (routeConfig, location) => {
	const matches = matchRoutes(routeConfig, location);

	return Promise.all(
		matches.map(match => {
			const { component } = match.route;
			if (component && component.preload) {
				return component.preload();
			}
			return undefined;
		}),
	);
};
