import React from 'react';
import Helmet from '@docanary/Helmet';
import '../var.css';
import '../global.css';
import './index.styl';

function Markdown(props) {
	const highlight = {
		version: '1.15.0',
		theme: 'tomorrow',
	};

	const themeUrl = `https://cdnjs.cloudflare.com/ajax/libs/prism/${
		highlight.version
	}/themes/prism-${highlight.theme}.min.css`;

	return [
		<Helmet>
			<link rel="stylesheet" type="text/css" href={themeUrl} />
		</Helmet>,
		props.children,
	];
}

export default Markdown;
