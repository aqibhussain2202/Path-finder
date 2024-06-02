import React from 'react'

const Pill = ({ name, currentState, toggleState }) => {
	return (
		<div className="pill">
			<button className="pill__btn" onClick={() => toggleState(!currentState)}>
				<div
					className={currentState ? 'pill__toggle active' : 'pill__toggle'}
				></div>
				<p>{name}</p>
			</button>
		</div>
	)
}

export default Pill
