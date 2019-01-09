import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import routes from '@generated/routes';
import preload from './preload';
import App from './App';

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
	preload(routes, window.location.pathname).then(() => {
		ReactDOM.render(
			<BrowserRouter>
				<App />
			</BrowserRouter>,
			document.getElementById('app'),
		);
	});
}
