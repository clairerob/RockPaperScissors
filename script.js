const moveButtons = Array.from(document.querySelectorAll('.move-button'))
moveButtons.forEach((btn) => btn.addEventListener('click', singleRound))

const computer = document.querySelector('#computer-guess')
const computerText = document.querySelector('#computer-text')

const newRound = document.querySelector('.new-round')
const resetBtn = document.querySelector('.reset-game')
newRound.addEventListener('click', updateNewRoundUI)
resetBtn.addEventListener('click', resetGame)

const backgroundShape = document.querySelector('.background-shape')
const roundOver = document.querySelector('.round-over')

const scoreDisplay = document.querySelector('.header-total')

const MOVE_SELECTIONS = ['rock', 'paper', 'scissors']
let currentScore = { computer: 0, player: 0 }
let winner = ''

function getPlayerSelection(e) {
	return e.target.dataset.selection
}
function getComputerSelection() {
	let choice = Math.floor(Math.random() * 3)
	let computerSelection = MOVE_SELECTIONS[choice]
	return computerSelection
}

function singleRound(e) {
	moveButtons.forEach((btn) => btn.removeEventListener('click', singleRound))

	const playerSelection = getPlayerSelection(e)
	updateStep2UI(playerSelection)

	const computerSelection = getComputerSelection()
	setTimeout(() => {
		updateStep3UI(computerSelection)
	}, 2000)

	findWinnerAndUpdateScore(playerSelection, computerSelection)
	setTimeout(() => {
		if (currentScore.computer >= 2 || currentScore.player >= 2) {
			updateGameOverUI()
		} else {
			updateStep4UI()
		}
		scoreDisplay.innerText = `${currentScore.player}:${currentScore.computer}`
	}, 4500)
}

function findWinnerAndUpdateScore(playerSelection, computerSelection) {
	if (playerSelection === computerSelection) {
		winner = 'none'
	} else if (
		(computerSelection === 'rock' && playerSelection === 'paper') ||
		(computerSelection === 'paper' && playerSelection === 'scissors') ||
		(computerSelection === 'scissors' && playerSelection === 'rock')
	) {
		winner = 'player'
		currentScore = { ...currentScore, player: (currentScore.player += 1) }
	} else if (
		(playerSelection === 'rock' && computerSelection === 'paper') ||
		(playerSelection === 'paper' && computerSelection === 'scissors') ||
		(playerSelection === 'scissors' && computerSelection === 'rock')
	) {
		winner = 'computer'
		currentScore = { ...currentScore, computer: (currentScore.computer += 1) }
	}
}

function updateStep2UI(playerSelection) {
	backgroundShape.classList.add('hide')
	document.getElementById('button-group').style.width = '1000px'

	moveButtons
		.filter((item) => playerSelection !== item.dataset.selection)
		.map((item) => item.classList.add('hide'))

	const playerBtn = moveButtons.find(
		(item) => playerSelection === item.dataset.selection
	)
	playerBtn.classList.add('current-choice')

	//ADD HIDE TO ALL PT CLASS ELEMENTS
	const playerText = document.getElementById(`${playerSelection}`)
	playerText.classList.remove('hide')

	//MAKE PT GLOBAL TO REMOVE ELEMENT
	//WINNER IMAGE APPENDED TO THIS OR COMPUTER DIV
	// const playerText = document.createElement('h3')
	// playerText.innerText = 'YOU PICKED'
	// playerText.classList.add('player-text')
	// const playerSelectionDiv = document.getElementById(`${playerSelection}`)
	// playerSelectionDiv.insertBefore(playerText, playerBtn)

	computer.classList.remove('hide')

	//make btns unclickable
}

function updateStep3UI(computerSelection) {
	computer.classList.add('move-button', 'current-choice', computerSelection)
	computer.classList.remove('blank')
	computerText.classList.remove('hide')
}

function updateStep4UI() {
	let winningText
	if (winner === 'player') winningText = 'YOU WIN'
	else if (winner === 'computer') winningText = 'YOU LOSE'
	else if (winner === 'none') winningText = "IT'S A DRAW"
	roundOver.classList.remove('hide')
	newRound.classList.remove('hide')
	document.querySelector('.winner-text').innerText = winningText
	//add winner gradient
	//spread layout
}

function updateGameOverUI() {
	let winningText
	if (winner === 'player') winningText = 'GAME OVER - YOU WON'
	else if (winner === 'computer') winningText = 'GAME OVER - YOU LOSE'
	roundOver.classList.remove('hide')
	newRound.classList.add('hide')
	document.querySelector('.winner-text').innerText = winningText
	//add more exciting winner UI
}

function resetGame() {
	currentScore = { computer: 0, player: 0 }
	updateNewRoundUI()
	scoreDisplay.innerText = `${currentScore.player}:${currentScore.computer}`
}

function updateNewRoundUI() {
	backgroundShape.classList.remove('hide')
	document.getElementById('button-group').style.width = '400px'
	moveButtons.map((item) => item.classList.remove('hide', 'current-choice'))
	MOVE_SELECTIONS.map((move) => computer.classList.remove(move))
	computer.classList.add('blank', 'hide')
	computerText.classList.add('hide')
	roundOver.classList.add('hide')

	moveButtons.forEach((btn) => btn.addEventListener('click', singleRound))
}

function showModal() {}
//add rules modal
//use random generator library
