import React from 'react'

const Button = ({ name, onPressed, color }) => {
	return (
		<button className={'button ' + color} onClick={() => onPressed()}>
			{name}
		</button>
	)
}

Button.defaultProps = {
	name: 'Button',
	color: 'default',
}

export default Button
