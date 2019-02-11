import React from 'react';
import './index.styl';

export default props => {
	if (props.error) {
		return <div>Error</div>;
	}

	if (props.pastDelay) {
		return (
			<div className='loading-wrap'>
				<span className='loading'>
					<i />
					<i />
					<i />
					<i />
				</span>
			</div>
		);
	}

	return null;
};
