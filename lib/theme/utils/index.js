import { useState, useEffect } from 'react';

const isClient = typeof window === 'object';

export const useScroll = () => {
	const [state, setState] = useState({
		scrollHeight: isClient ? window.scrollY : 0,
	});

	useEffect(
		() => {
			const handler = () => {
				setState({
					scrollHeight: window.scrollY,
				});
			};
			window.addEventListener('scroll', handler);
			return () => window.removeEventListener('scroll', handler);
		},
		[1],
	);

	return state;
};
