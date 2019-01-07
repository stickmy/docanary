import React from 'react';
import Navbar from '@theme/Navbar';
import Footer from '@theme/Footer';
import BackToTop from '@theme/BackToTop';
import '../style/theme.styl'; // import theme css
import './index.styl';

function PageLayout(props) {
	return (
		<>
			<Navbar />
			<div className="page-layout">{props.children}</div>
			<Footer />
			<BackToTop />
		</>
	);
}

export default PageLayout;
