import React, { useContext } from 'react';
import classnames from 'classnames';
import postContext from '@theme/SideBar/postContext';
import HeaderLink from './headerLink';
import { useScroll } from '../utils';
import styles from './index.styl?module';

function PostHeaders() {
	const { postMetadata } = useContext(postContext);

	const headers = postMetadata.headers || [];

	const specLevelheader = headers.filter(({ level }) => level === 2);

	const PostHeaders = specLevelheader.map(({ title, slug }) => {
		return <HeaderLink label={title} anchor={slug} key={slug} />;
	});

	const { scrollHeight } = useScroll();

	const affix = scrollHeight >= 60; /** $navbarHeight */

	const className = classnames(styles.nav, { 'nav-affix': affix });

	return (
		<div id="docs-header" className={styles.postHeaders}>
			<nav id="header-nav" className={className}>
				<h4 tabIndex="0" className={styles.desc}>
					In this post
				</h4>
				<ul>{PostHeaders}</ul>
			</nav>
		</div>
	);
}

export default React.memo(PostHeaders);
