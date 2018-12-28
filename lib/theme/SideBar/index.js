import React, { useContext } from 'react';
import DocanaryContext from '@docanary/context';
import SidebarLink from './SidebarLink';
import styles from './index.styl?module';

function SideBar() {
	const context = useContext(DocanaryContext);
	const { metadatas } = context;

	const Items = Object.values(metadatas).map(({ title, permalink }) => {
		return (
			<SidebarLink label={title} href={permalink} key={permalink} />
		);
	});

	return (
		<div className={styles.sidebar}>
			<nav id="navbar">
				<ul className={styles.nav}>{Items}</ul>
			</nav>
		</div>
	);
}

export default SideBar;
