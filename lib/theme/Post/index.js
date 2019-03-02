import React from 'react';
import { useMount } from '../utils';
import './index.styl?module';

function Post(props) {
	const { children, metadata } = props;
	const date = new Date(metadata.date).toLocaleDateString() || null;

	useMount(() => {
		window.scrollTo({ top: 0 });
	});

	return (
		<div id="post" className="post">
			<h1>{metadata.title}</h1>
			{date && <span>{date}</span>}
			{children}
		</div>
	);
}

export default Post;
