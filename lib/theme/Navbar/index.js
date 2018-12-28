import React from 'react';
import styles from './index.styl?module';

function Header(props) {
	return (
		<div className={styles.navbar}>
			<nav role='navigation' className={styles.nav}>
				<div className={styles.container}>
					<div className={styles['navbar-header']}>DOCANARY</div>
				</div>
			</nav>
		</div>
	)
}

export default Header;
