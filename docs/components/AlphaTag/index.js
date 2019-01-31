import React from 'react';
import styles from './index.styl?module';

function AlphaTag(props) {
	return <span className={styles.alphaTag}>{props.children}</span>;
}

export default AlphaTag;
