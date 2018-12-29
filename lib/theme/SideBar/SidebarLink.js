import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

function SidebarLink({ href, label, isActive }) {
	const className = classnames({ active: !!isActive });
	return (
		<li className={className}>
			<Link to={href}>{label}</Link>
		</li>
	);
}

export default SidebarLink;
