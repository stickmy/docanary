import React, { useContext } from 'react';
import Docanary from '@docanary/context';
import { Link, withRouter, matchPath } from 'react-router-dom';
import classnames from 'classnames';
import styles from './index.styl?module';

function Header({ location }) {
	const context = useContext(Docanary);
	const { headerLinks } = context;

	function makeLink({ label, link, href }) {
		const active = matchPath(location.pathname, { path: link });
		const className = classnames({ [styles.active]: active });
		return (
			<li key={label} className={className}>
				{!href && <Link to={link}>{label}</Link>}
				{href && (
					<a href={href} target="_blank" rel="noopener noreferrer">
						{label}
					</a>
				)}
			</li>
		);
	}

	return (
		<div className={styles.navbar}>
			<nav role="navigation" className={styles.nav}>
				<div className={styles.container}>
					<div className={styles['navbar-header']}>
						<Link to="/">DOCANARY</Link>
					</div>
					<ul>{headerLinks.map(makeLink)}</ul>
				</div>
			</nav>
		</div>
	);
}

export default withRouter(Header);
