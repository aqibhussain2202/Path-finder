import React, { useEffect, useRef, useState } from 'react'

const Grid = ({ grid, numOfCols, numOfRows, needsReset, isRunning }) => {
	const [items, setItems] = useState(null)
	const currentDirection = useRef('bottom')

	const requiredDropdown = useRef(window.screen.width <= 1000)

	function HandleWallPlacement(e, pos) {
		if (
			e.buttons === 1 &&
			e.shiftKey &&
			(e.target.className === 'grid__item' ||
				e.target.className === 'grid__item wall')
		) {
			if (!isRunning) {
				if (!needsReset) {
					items.forEach((item) => {
						if (item.key === pos) {
							e.target.classList.toggle('wall')
						}
					})
				}
			}
		}
	}

	function UpdateDropdown(pos, newState) {
		if (!isRunning) {
			if (!needsReset) {
				let tempArr = [...items]

				tempArr.forEach((item) => {
					item.openDropdown = false
					if (item.key === pos) {
						item.openDropdown = newState
					}
				})

				setItems(tempArr)
			}
		}
	}

	function DropdownSelect(e, pos) {
		const gridItem = e.target.parentElement.parentElement

		if (e.target.className.includes('fa-bullseye')) {
			if (gridItem.className === 'grid__item') {
				HandleTargetPlacement(e, pos, true)
			}
		} else if (e.target.className.includes('fa-arrow-right')) {
			if (gridItem.className === 'grid__item') {
				HandleStartPlacement(e, pos, true)
			}
		} else if (
			!e.target.className.includes('fa-arrow-right') &&
			!e.target.className.includes('fa-bullseye')
		) {
			if (
				gridItem.className === 'grid__item' ||
				gridItem.className === 'grid__item wall'
			) {
				e.target.parentElement.parentElement.classList.toggle('wall')
			}
		}
		UpdateDropdown(pos, false)
	}

	function HandleTargetPlacement(e, pos, force) {
		if (
			(e.buttons === 1 && e.target.className === 'grid__item' && e.ctrlKey) ||
			force
		) {
			if (!isRunning) {
				if (!needsReset) {
					let tempArr = [...items]

					tempArr.forEach((item) => {
						if (item.className === 'grid__item target') {
							item.className = 'grid__item'
						}
					})

					tempArr.forEach((item) => {
						if (item.key === pos) {
							item.className = 'grid__item target'
						}
					})

					setItems(tempArr)
				}
			}
		}
	}

	function HandleStartPlacement(e, pos, force) {
		if (
			(e.buttons === 1 &&
				e.target.className === 'grid__item' &&
				!e.ctrlKey &&
				!e.shiftKey) ||
			force
		) {
			if (!isRunning) {
				if (!needsReset) {
					let tempArr = [...items]

					tempArr.forEach((item) => {
						if (item.className === 'grid__item start') {
							item.className = 'grid__item'
						}
					})

					tempArr.forEach((item) => {
						if (item.key === pos) {
							item.className = 'grid__item start'
						}
					})

					setItems(tempArr)
				}
			}
		}
	}

	function ItemClicked(e, pos) {
		if (!requiredDropdown.current) {
			HandleWallPlacement(e, pos, false)
			HandleStartPlacement(e, pos, false)
			HandleTargetPlacement(e, pos, false)
		} else {
			let tempArr = [...items]

			tempArr.forEach((item) => {
				if (item.key === pos) {
					if (!item.openDropdown) {
						UpdateDropdown(pos, true)
						const gridContent = document.querySelector('.grid__content')

						const wH = gridContent.offsetHeight
						const iH = e.target.getBoundingClientRect().top

						const difference = wH - iH

						if (difference <= 250) {
							currentDirection.current = 'upward'
						} else {
							currentDirection.current = 'bottom'
						}
					}
				}
			})
		}
	}

	const MakeGrid = () => {
		var temp = []

		for (let i = 0; i < numOfRows; i++) {
			for (let j = 0; j < numOfCols; j++) {
				if (
					j === numOfCols - Math.floor(numOfCols / 2 / 2) - 1 &&
					i === Math.floor(numOfRows / 2)
				) {
					temp.push({
						key: numOfCols * i + j,
						className: 'grid__item target',
						openDropdown: false,
					})
				} else if (
					j === Math.floor(numOfCols / 2 / 2) &&
					i === Math.floor(numOfRows / 2)
				) {
					temp.push({
						key: numOfCols * i + j,
						className: 'grid__item start',
						openDropdown: false,
					})
				} else {
					temp.push({
						key: numOfCols * i + j,
						className: 'grid__item',
						openDropdown: false,
					})
				}
			}
		}
		setItems(temp)
	}

	useEffect(() => {
		if (grid != []) {
			MakeGrid()
		}
	}, [grid])

	useEffect(() => {
		let handler = () => {
			requiredDropdown.current = window.screen.width <= 1000
		}

		window.addEventListener('resize', () => handler())

		return () => window.removeEventListener('resize', () => handler())
	}, [])

	return (
		<div className="grid">
			<div className="grid__container container">
				<div className="grid__content">
					{items &&
						items.map((item) => (
							<span
								onMouseDown={(e) => ItemClicked(e, item.key)}
								onMouseEnter={(e) => HandleWallPlacement(e, item.key, false)}
								key={item.key}
								className={item.className}
							>
								<i
									className={
										item.className === 'grid__item start'
											? 'fa-solid fa-arrow-right grid__item__start'
											: 'grid__item__none'
									}
								></i>
								<i
									className={
										item.className === 'grid__item target'
											? 'fa-solid fa-bullseye grid__item__target'
											: 'grid__item__none'
									}
								></i>
								<div
									className={
										item.openDropdown === false
											? 'grid__item__dropdown has-fade disabled'
											: 'grid__item__dropdown has-fade fade-in ' +
											  currentDirection.current
									}
								>
									<i
										className="grid__item__dropdown__item red fa-solid fa-bullseye"
										onClick={(e) => DropdownSelect(e, item.key)}
									/>
									<i
										className="grid__item__dropdown__item yellow fa-solid fa-arrow-right"
										onClick={(e) => DropdownSelect(e, item.key)}
									/>
									<i
										className="grid__item__dropdown__item default"
										onClick={(e) => DropdownSelect(e, item.key)}
									/>
								</div>
							</span>
						))}
				</div>
			</div>
		</div>
	)
}

export default Grid
