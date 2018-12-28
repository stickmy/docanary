import React from 'react';
import classnames from 'classnames';
import { Link, matchPath, withRouter } from 'react-router-dom';

function SidebarLink({ href, label, location }) {
	const isActive = matchPath(location.pathname, { path: href });
	const className = classnames({ active: !!isActive });
	return (
		<li className={className}>
			<Link to={href}>{label}</Link>
		</li>
	);
}

export default withRouter(SidebarLink);
