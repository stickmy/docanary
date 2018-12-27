import React from 'react';
import { renderRoutes } from 'react-router-config';
import styles from './index.scss?module';

function Doc(props) {
	const { route } = props;

	return (
		<div className={styles.doc}>
			<div>{renderRoutes(route.routes)}</div>
		</div>
	);
}

export default Doc;
