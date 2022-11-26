document.addEventListener('DOMContentLoaded', () => {
	const mainScreen = document.querySelector('.main__screen')
	const set = document.querySelector('#set')
	const setDeck = document.querySelector('.set__deck')
	const start = document.querySelector('#start')
	let clientHeight = document.documentElement.clientHeight
	const inputRows = document.querySelector('#rows')
	const inputColumns = document.querySelector('#columns')
	const board = document.querySelector('#board')
	const colors = ['#0ACF83', '#09DCB7', '#9696FF', '#FF7878', '#CE455D', '#00B1FF', '#FFD764']
	const goUpBtn = document.querySelector('.board-section__btn')

	mainScreen.classList.remove('hidden')
	setDeck.classList.remove('hidden')

	function goDown(height) {
		document.documentElement.scrollBy({
			top: height - window.pageYOffset,
			behavior: 'smooth'
		})
	}

	set.addEventListener('click', () => {
		goDown(clientHeight)
	})

	start.addEventListener('click', (e) => {
		e.preventDefault()

		if (inputRows.value === '' || inputColumns.value === '') {
			e.target.classList.add('error')
		} else {
			e.target.classList.remove('error')

			restartBoard()
			goDown(clientHeight * 2)
			setBoardSize()
			addCellsOnBoard()
		}
	})

	inputSettings(inputRows)
	inputSettings(inputColumns)

	function inputSettings(input) {
		input.oninput = e => {
			let target = e.target
			target.value = target.value.replace(/\D/g, '')

			if (target.getAttribute('id') === 'rows' && target.value > 60) {
				target.value = 60
			}
			if (target.getAttribute('id') === 'columns' && target.value > 40) {
				target.value = 40
			}
			if (target.getAttribute('id') === 'rows' && target.value <= 0 || target.getAttribute('id') === 'columns' && target.value <= 0) {
				target.value = 1
			}
		}
	}

	function setBoardSize() {
		let boardWidth = `${inputRows.value * 18 + 16}px`
		let boardHeight = `${inputColumns.value * 18 + 16}px`

		board.style.width = boardWidth
		board.style.height = boardHeight
	}

	function addCellsOnBoard() {
		let totalCells = +inputRows.value * +inputColumns.value

		for (let i = 0; i < totalCells; i++) {
			const cell = document.createElement('div')
			cell.classList.add('square')
			board.append(cell)

			cell.addEventListener('mouseover', () => {
				onCell(cell)
			})
			cell.addEventListener('mouseleave', () => {
				offCell(cell)
			})
		}
	}

	function onCell(el) {
		const color	= randomColor()
		el.style.backgroundColor = color
		el.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
	}
	function offCell(el) {
		el.style.backgroundColor = ''
		el.style.boxShadow = ''
	}
	
	function randomColor() {
		const colorIndex = Math.floor(Math.random() * colors.length)
		return colors[colorIndex]
	}
	
	function restartBoard() {
		boardWidth = `${0}px`
		boardHeight = `${0}px`
		board.textContent = ''
	}

	goUpBtn.addEventListener('click', () => {
		setDeck.scrollIntoView({
			inline: 'start',
			behavior: 'smooth'
		})
	})

})