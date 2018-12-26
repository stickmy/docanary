import React from 'react';
import { renderRoutes } from 'react-router-config';

function Doc(props) {
	const { route } = props;

	return (
		<div>
			<div>{renderRoutes(route.routes)}</div>
		</div>
	);
}

export default Doc;
