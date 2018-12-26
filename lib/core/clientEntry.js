import React from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('app');

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
	ReactDOM.render(
		<div>123</div>,
		root
	)
}