import { useState, useEffect } from 'react';

const isClient = typeof window === 'object';

export const findLastIndex = (array, predicate, context) => {
	const length = array.length;
	for (let i = length - 1; i >= 0; i--) {
		if (predicate.call(context, array[i], i, array)) return i;
	}
	return -1;
};

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

export const useMount = mount => useEffect(mount, []);

export const useChangeCSSVariable = (palette) =>
	useMount(() => {
		const root = document.documentElement;
		if (root) {
			Object.keys(palette).forEach(key => {
				const value = palette[key];
				root.style.setProperty(key, value);
			})
		}
	});

export const useActiveAnchor = (anchors, currentAnchor, dependent) => {
	const [state, setState] = useState(currentAnchor);

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
			return {
				anchor,
				top: top + window.pageYOffset - document.documentElement.clientTop,
			};
		});

		return ret;
	};

	useEffect(
		() => {
			let anchorElements = getAnchorElements(anchors);

			// TODO: Optimize with requestAnimationFrame method
			const handler = () => {
				// NOTICE: If useEffect had been called, but dont capture any anchorElements
				// Then, we'll re-capture the anchorElements.
				// Because our effect is dependent on permalink, when route changed, permalink
				// will changed immediately, but dom is not flushing immediately.
				// So at this moment, we can not get any anchorElement from dom.
				if (anchorElements.length !== anchors.length) {
					anchorElements = getAnchorElements(anchors);
				}

				const rects = getRectTop(anchorElements);

				const lastIndex = findLastIndex(
					rects,
					({ top }) => top <= window.pageYOffset,
				);

				if (lastIndex === -1) return;
				setState(rects[lastIndex].anchor);
			};
			window.addEventListener('scroll', handler);
			return () => window.removeEventListener('scroll', handler);
		},
		[...dependent],
	);

	return [state, setState];
};
