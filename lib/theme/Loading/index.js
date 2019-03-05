import React from 'react';
import './index.styl';

export default props => {
	if (props.error) {
		return <div>Error</div>;
	}

	if (props.pastDelay) {
		return <div className="circle-loading" />;
	}

	return null;
};
