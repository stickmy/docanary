import React from 'react';
import Navbar from '@theme/Navbar';
import BackToTop from '@theme/BackToTop';
import '../style/theme.styl'; // import theme css
import './index.styl';

function Layout(props) {
	return (
		<>
			<Navbar />
			<div className='layout'>{props.children}</div>
			<BackToTop />
		</>
	);
}

export default Layout;
