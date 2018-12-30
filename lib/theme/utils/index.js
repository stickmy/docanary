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

export const useActiveAnchor = (anchors, currentAnchor, dependent) => {
	const [state, setState] = useState({
		activeAnchor: null,
	});

	function getAnchorElements(anchors) {
		return anchors
			.map(anchor => {
				const element = document.getElementById(anchor);
				if (!element) return;
				return { anchor, element };
			})
			.filter(elem => elem !== undefined);
	}

	const getRectTop = elements => {
		const ret = elements.map(({ anchor, element }) => {
			const { top } = element.getBoundingClientRect();
			return { anchor, top };
		});

		return ret;
	};

	const offset = 1;

	// Record last scroll height
	let lastScrollHeight = isClient ? window.scrollY : 0;

	// Record current active anchor
	// If route.hash is not empty, the default value is decodeURI(route.hash.slice(1))
	// Else the default value is `null`.
	let activeAnchor = currentAnchor;

	useEffect(
		() => {
			// Reset activeAnchor after route changed.
			setState({ activeAnchor: currentAnchor });

			const anchorElements = getAnchorElements(anchors);

			// TODO: Optimize with requestAnimationFrame method
			const handler = () => {
				// Page scroll direction
				const isDown = window.scrollY - lastScrollHeight > 0;
				lastScrollHeight = window.scrollY;

				const rects = getRectTop(anchorElements);
				const currentActiveIndex = rects.findIndex(
					({ anchor }) => anchor === activeAnchor,
				);

				// Scroll down. And not the last one
				if (isDown && currentActiveIndex < anchorElements.length - 1) {
					const nextAnchor = rects[currentActiveIndex + 1];
					if (nextAnchor.top <= offset) {
						activeAnchor = nextAnchor.anchor;
						setState({ activeAnchor: nextAnchor.anchor });
					}
				} else if (!isDown && currentActiveIndex > 0) {
					const prevAnchor = rects[currentActiveIndex - 1];
					const currentAnchor = rects[currentActiveIndex];
					if (currentAnchor.top >= -offset) {
						activeAnchor = prevAnchor.anchor;
						setState({ activeAnchor: prevAnchor.anchor });
					}
				}
			};
			window.addEventListener('scroll', handler);
			return () => window.removeEventListener('scroll', handler);
		},
		[...dependent],
	);

	return state;
};
