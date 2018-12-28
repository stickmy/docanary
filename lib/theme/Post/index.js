import React from 'react';
import styles from './index.styl?module';

function Post(props) {
	const { children } = props;

	return <div className={styles.post}>{children}</div>;
}

export default Post;
