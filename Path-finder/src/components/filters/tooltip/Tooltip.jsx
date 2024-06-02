import React from 'react'
import { useEffect } from 'react'
import { useState, useRef } from 'react'

const Tooltip = ({ backgroundColor, icon, tooltip, info }) => {
	const [isHovering, setIsHovering] = useState(false)
	const [currentFade, setCurrentFade] = useState('')

	const displayTooltip = useRef(window.screen.width >= 1000)

	useEffect(() => {
		if (isHovering) {
			setCurrentFade('fade-in')
		} else {
			setCurrentFade('fade-out')
		}
	}, [isHovering])

	useEffect(() => {
		let handler = () => {
			displayTooltip.current = window.screen.width >= 1000
		}

		window.addEventListener('resize', () => handler())

		return () => window.removeEventListener('resize', () => handler())
	}, [])

	return (
		<div
			className="tooltip"
			onMouseLeave={() => setIsHovering(false)}
			onMouseEnter={() => setIsHovering(true)}
		>
			<div className={'tooltip__wrapper ' + backgroundColor}>
				<i className={'tooltip__icon ' + icon} />
				<p
					className={
						displayTooltip.current
							? 'tooltip__wrapper__info has-fade ' + currentFade
							: 'tooltip__none'
					}
				>
					{info}
				</p>
			</div>
			<p className="tooltip__text">{tooltip}</p>
		</div>
	)
}

Tooltip.defaultProps = {
	tooltip: 'This is a tooltip',
	backgroundColor: 'default',
	info: 'CTRL left click',
}
export default Tooltip
