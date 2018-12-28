import React from 'react';
import Navbar from '@theme/Navbar';
import styles from './index.styl?module';

function Layout(props) {
	return (
		<>
			<Navbar />
			<div className={styles.layout}>{props.children}</div>
		</>
	);
}

export default Layout;
