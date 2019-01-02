import React, { useContext, useState, useEffect } from 'react';
import postContext from '@theme/SideBar/postContext';
import { withRouter } from 'react-router-dom';
import HeaderLink from './headerLink';
import { useActiveAnchor, useMount } from '../utils';
import styles from './index.styl?module';

function getCurrentAnchor(hash) {
	if (hash === '') return null;

	return decodeURIComponent(hash.slice(1));
}

function PostHeaders({ location }) {
	const { postMetadata } = useContext(postContext);

	const headers = postMetadata.headers || [];

	// Only h2 level will generate header links.
	const specLevelheader = headers.filter(({ level }) => level === 2);

	const anchors = specLevelheader.map(({ slug }) => slug);

	const currentAnchor = getCurrentAnchor(location.hash);

	const [activeAnchor, setAnchorHook] = useActiveAnchor(
		anchors,
		currentAnchor,
		[postMetadata.permalink],
	);

	const PostHeaders = specLevelheader.map(({ title, slug }) => {
		const isActive = slug === activeAnchor;
		return (
			<HeaderLink
				onClick={setAnchorHook}
				label={title}
				anchor={slug}
				isActive={isActive}
				key={slug}
			/>
		);
	});

	return (
		<div id="docs-header" className={styles.postHeaders}>
			<nav id="header-nav" className={styles.nav}>
				<h4 tabIndex="0" className={styles.desc}>
					In this post
				</h4>
				<ul>{PostHeaders}</ul>
			</nav>
		</div>
	);
}

export default React.memo(withRouter(PostHeaders));
