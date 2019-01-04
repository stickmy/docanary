import React from 'react';
import { useScroll } from '../utils';
import './index.styl';

function BackToTop() {
	const OFFSET = 60;

	const { scrollHeight } = useScroll();

	if (scrollHeight <= OFFSET) return null;

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<div id="back-to-top" onClick={scrollToTop}>
			<svg viewBox="0 0 24 24">
				<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
			</svg>
		</div>
	);
}

export default BackToTop;
