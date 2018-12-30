import React from 'react'
import classnames from 'classnames';
import styles from './index.styl?module';

function HeaderLink({ label, anchor, isActive }) {
	const className = classnames({ [styles.active]: isActive });
	return (
		<li className={className}>
			<a href={`#${anchor}`} aria-hidden={true}>{label}</a>
		</li>
	)
}

export default HeaderLink;