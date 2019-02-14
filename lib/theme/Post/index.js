import React from 'react';
import './index.styl?module';

function Post(props) {
	const { children, metadata } = props;
	const date = new Date(metadata.date).toLocaleDateString() || null;

	return (
		<div id="post" className="post">
			<h1>{metadata.title}</h1>
			{date && <span>{date}</span>}
			{children}
		</div>
	);
}

export default Post;
