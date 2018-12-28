import React from 'react';
import Navbar from '@theme/Navbar';
import '../style/theme.styl'; // import theme css
import './index.styl';

function Layout(props) {
	return (
		<>
			<Navbar />
			<div className='layout'>{props.children}</div>
		</>
	);
}

export default Layout;
