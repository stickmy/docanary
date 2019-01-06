import React, { useContext, useEffect } from 'react';
import DocanaryContext from '@docanary/context';
import { matchPath, withRouter } from 'react-router-dom';
import PostContext from './postContext';
import SidebarLink from './SidebarLink';
import styles from './index.styl?module';

function SideBar({ location }) {
	const context = useContext(DocanaryContext);
	const { metadatas } = context;

	const { setContext } = useContext(PostContext);

	const postMetadatas = Object.values(metadatas).sort((prev, next) => {
		if (!prev.date || !next.date) return false;
		const prevDate = +new Date(prev.date);
		const nextDate = +new Date(next.date);
		return prevDate - nextDate > 0 ? -1 : 1;
	})

	const sidebarLinks = postMetadatas.map(metadata => {
		const { title, permalink } = metadata;
		const isActive = matchPath(location.pathname, { path: permalink });

		// TODO Resolve for twice re-render
		if (isActive) {
			useEffect(
				() => {
					setContext({ postMetadata: metadata });
				},
				[permalink],
			);
		}

		return (
			<SidebarLink
				label={title}
				href={permalink}
				key={permalink}
				isActive={isActive}
			/>
		);
	});

	return (
		<div className={styles.sidebar}>
			<nav id="navbar">
				<h4 className={styles.desc}>Posts</h4>
				<ul className={styles.nav}>{sidebarLinks}</ul>
			</nav>
		</div>
	);
}

const MemoSideBar = React.memo(SideBar, (prev, next) => {
	return prev.location.pathname === next.location.pathname;
})

export default withRouter(MemoSideBar);
