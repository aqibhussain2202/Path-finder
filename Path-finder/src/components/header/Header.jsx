import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<header className="header">
			<nav className="header__nav container">
				<Link to="/">
					<h1 className="header__nav__title">Pathfinder</h1>
				</Link>
			</nav>
		</header>
	)
}

export default Header
