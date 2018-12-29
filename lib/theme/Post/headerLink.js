import React from 'react'

function HeaderLink({ label, anchor }) {
	return (
		<li>
			<a href={`#${anchor}`} aria-hidden={true}>{label}</a>
		</li>
	)
}

export default HeaderLink;