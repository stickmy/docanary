import React, { useContext, useEffect } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import PageContext from './pageContext';
import styles from './index.styl?module';

function PagePost(props) {
	const { children, metadata } = props;

	function renderAction(actions) {
		return actions.map(({ text, link, href }) => {
			if (href) {
				return (
					<div className={styles.actionWrap} key={href}>
						<a
							role="button"
							className={styles.action}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
						>
							{text}
						</a>
					</div>
				);
			}
			return (
				<div className={styles.actionWrap} key={link}>
					<Link role="button" className={styles.action} to={link}>
						{text}
					</Link>
				</div>
			);
		});
	}

	function renderHome() {
		return (
			<section className={styles.home}>
				<h1>{metadata.tagline}</h1>
				<h2>{metadata.description}</h2>
				{renderAction(metadata.actions)}
			</section>
		);
	}

	function renderFeatures() {
		const features = metadata.features;
		return (
			<section>
				{features.map((feature, index) => {
					const isLeft = feature.align === 'left' || index % 2 === 0;

					const featureClass = classnames(styles.feature, {
						[styles.alignLeft]: isLeft,
						[styles.alignRight]: !isLeft,
					});

					const leftDoc = [
						<img src={feature.img} />,
						<div className={styles.featureDoc}>
							<p>{feature.title}</p>
							<span>{feature.description}</span>
						</div>,
					];
					const rightDoc = [
						<div className={styles.featureDoc}>
							<p>{feature.title}</p>
							<span>{feature.description}</span>
						</div>,
						<img src={feature.img} />,
					];

					return (
						<div key={feature.title} className={featureClass}>
							{isLeft && leftDoc}
							{!isLeft && rightDoc}
						</div>
					);
				})}
			</section>
		);
	}

	const { setContext } = useContext(PageContext);

	const { permalink } = metadata;
	useEffect(
		() => {
			setContext({ pageMetadata: metadata });
			return () => setContext({ pageMetadata: {} });
		},
		[permalink],
	);

	return (
		<div className={styles.page}>
			{renderHome()}
			{renderFeatures()}
			{children}
		</div>
	);
}

export default PagePost;
