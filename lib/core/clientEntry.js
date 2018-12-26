import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import routes from '@generated/routes';
import preload from './preload';
import App from './App';

const root = document.getElementById('app');

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
	preload(routes, window.location.pathname).then(() => {
		ReactDOM.render(
			<BrowserRouter>
				<App />
			</BrowserRouter>,
			root,
		);
	});
}
