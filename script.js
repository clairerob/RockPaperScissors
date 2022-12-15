const MOVE_SELECTIONS = ['rock', 'paper', 'scissors']

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

const playerWinnerGradient = document.querySelector('.player-winner-gradient')
const computerWinnerGradient = document.querySelector(
	'.computer-winner-gradient'
)

const scoreDisplay = document.querySelector('.header-total')
function getInitialScore() {
	if (
		!localStorage.getItem('playerScore') ||
		!localStorage.getItem('computerScore')
	) {
		localStorage.setItem('playerScore', '0')
		localStorage.setItem('computerScore', '0')
	}
}
let playerScore = parseInt(localStorage.getItem('playerScore'))
let computerScore = parseInt(localStorage.getItem('computerScore'))
scoreDisplay.innerText = `${playerScore}:${computerScore}`

let winner = ''

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
		if (computerScore >= 3 || playerScore >= 3) {
			updateGameOverUI()
		} else {
			updateStep4UI()
		}
		scoreDisplay.innerText = `${playerScore}:${computerScore}`
	}, 4500)
}

function getPlayerSelection(e) {
	return e.target.dataset.selection
}
function getComputerSelection() {
	let choice = Math.floor(Math.random() * 3)
	let computerSelection = MOVE_SELECTIONS[choice]
	return computerSelection
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
		localStorage.setItem('playerScore', (playerScore += 1))
	} else if (
		(playerSelection === 'rock' && computerSelection === 'paper') ||
		(playerSelection === 'paper' && computerSelection === 'scissors') ||
		(playerSelection === 'scissors' && computerSelection === 'rock')
	) {
		winner = 'computer'
		localStorage.setItem('computerScore', (computerScore += 1))
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

	const playerText = document.getElementById(`${playerSelection}`)
	playerText.classList.remove('hide')

	computer.classList.remove('hide')
}

function updateStep3UI(computerSelection) {
	computer.classList.add('move-button', 'current-choice', computerSelection)
	computer.classList.remove('blank')
	computerText.classList.remove('hide')
}

function updateStep4UI() {
	let winningText
	if (winner === 'player') {
		winningText = 'YOU WIN'
		playerWinnerGradient.classList.remove('hide')
	} else if (winner === 'computer') {
		winningText = 'YOU LOSE'
		computerWinnerGradient.classList.remove('hide')
	} else if (winner === 'none') winningText = "IT'S A DRAW"
	roundOver.classList.remove('hide')
	newRound.classList.remove('hide')
	document.querySelector('.winner-text').innerText = winningText
}

function updateGameOverUI() {
	let winningText
	if (winner === 'player') {
		winningText = 'GAME OVER - YOU WON'
		playerWinnerGradient.classList.remove('hide')
	} else if (winner === 'computer') {
		winningText = 'GAME OVER - YOU LOSE'
		computerWinnerGradient.classList.remove('hide')
	}
	roundOver.classList.remove('hide')
	newRound.classList.add('hide')
	document.querySelector('.winner-text').innerText = winningText
}

function resetGame() {
	localStorage.setItem('playerScore', '0')
	localStorage.setItem('computerScore', '0')
	updateNewRoundUI()
	scoreDisplay.innerText = '0:0'
}

function updateNewRoundUI() {
	backgroundShape.classList.remove('hide')
	document.getElementById('button-group').style.width = '400px'
	MOVE_SELECTIONS.map((move) => computer.classList.remove(move))
	computer.classList.add('blank', 'hide')
	computerText.classList.add('hide')
	roundOver.classList.add('hide')
	playerWinnerGradient.classList.add('hide')
	computerWinnerGradient.classList.add('hide')
	const playerText = document.querySelectorAll('.player-text')
	playerText.forEach((el) => el.classList.add('hide'))
	moveButtons.map((item) => item.classList.remove('hide', 'current-choice'))
	moveButtons.forEach((btn) => btn.addEventListener('click', singleRound))
}

const rulesModalBtn = document.querySelector('#rules-btn')
const rulesModal = document.querySelector('#rules-modal')
const closeModal = document.querySelector('#close-icon')
rulesModalBtn.addEventListener('click', showModal)
closeModal.addEventListener('click', hideModal)
rulesModal.addEventListener('click', hideModal)

function showModal() {
	rulesModal.classList.add('open')
}
function hideModal(e) {
	rulesModal.classList.remove('open')
}

//use random generator library
