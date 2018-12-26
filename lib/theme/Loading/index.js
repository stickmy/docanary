import React from 'react';

export default props => {
	if (props.error) {
		return <div>Error</div>;
	}

	if (props.pastDelay) {
		return <div>wait a moment</div>;
	}

	return null;
};
