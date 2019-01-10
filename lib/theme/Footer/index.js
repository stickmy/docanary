import React from 'react';
import styles from './index.styl?module';

function Footer() {
	return (
		<footer id="footer" className={styles.footer}>
			<section className={styles.copyright}>Powered by Docanary</section>
		</footer>
	);
}

export default Footer;
