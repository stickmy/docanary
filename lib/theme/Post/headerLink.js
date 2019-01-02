import React from 'react';
import classnames from 'classnames';
import styles from './index.styl?module';

function HeaderLink({ label, anchor, isActive, onClick }) {
	const className = classnames({ [styles.active]: isActive });
	return (
		<li className={className}>
			<a href={`#${anchor}`} onClick={() => onClick(anchor)} aria-hidden={true}>
				{label}
			</a>
		</li>
	);
}

export default HeaderLink;
