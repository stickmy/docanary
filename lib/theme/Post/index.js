import React from 'react';
import './index.styl?module';

function Post(props) {
	const { children, metadata } = props;

	return (
		<div className="post">
			<h1>{metadata.title}</h1>
			{children}
		</div>
	);
}

export default Post;
