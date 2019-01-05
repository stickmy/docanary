import React from 'react';
import Layout from '@theme/Layout';
import './index.styl';

function NotFound() {
	return (
		<Layout>
			<div className='not-found-container'>
				<div id="not-found" />
				<div className='not-found-action'>
					<h1>404</h1>
					<blockquote>The page went on flight 404.</blockquote>
				</div>
			</div>
		</Layout>
	);
}

export default NotFound;
