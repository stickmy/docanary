import React from 'react';
import styles from './index.styl?module';

function TodoTag(props) {
	return <span className={styles.todoTag}>{props.children}</span>;
}

export default TodoTag;
