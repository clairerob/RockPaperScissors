const MOVE_SELECTIONS = ['rock', 'paper', 'scissors']
const paper = document.querySelector('.paper')
const scissors = document.querySelector('.scissors')
const rock = document.querySelector('.rock')
const buttons = [paper, scissors, rock]

const newRound = document.querySelector('.new-round')
const resetBtn = document.querySelector('.reset-game')

const backgroundShape = document.querySelector('.background-shape')
const roundOver = document.querySelector('.round-over')

const scoreDisplay = document.querySelector('.header-total')

let currentScore = { computer: 0, player: 0 }
let winner = ''

paper.addEventListener('click', singleRound)
scissors.addEventListener('click', singleRound)
rock.addEventListener('click', singleRound)

newRound.addEventListener('click', newRoundUI)
resetBtn.addEventListener('click', resetGame)

function getPlayerSelection(e) {
	console.log('user selection: ' + e.target.dataset.selection)
	return e.target.dataset.selection
}
function getComputerSelection() {
	let choice = Math.floor(Math.random() * 3)
	let computerSelection = MOVE_SELECTIONS[choice]
	console.log('computer selection: ' + computerSelection)
	return computerSelection
}

function singleRound(e) {
	const playerSelection = getPlayerSelection(e)
	//update UI (step 2)
	step2UI(playerSelection)

	const computerSelection = getComputerSelection()
	//update UI (step 3)
	setTimeout(() => {
		step3UI(computerSelection)
	}, 2000)

	if (computerSelection === playerSelection) {
		console.log("It's a draw!")
		winner = 'none'
	} else if (
		(computerSelection === 'rock' && playerSelection === 'paper') ||
		(computerSelection === 'paper' && playerSelection === 'scissors') ||
		(computerSelection === 'scissors' && playerSelection === 'rock')
	) {
		console.log('Player wins round!')
		winner = 'player'
		currentScore = { ...currentScore, player: (currentScore.player += 1) }
	} else if (
		(playerSelection === 'rock' && computerSelection === 'paper') ||
		(playerSelection === 'paper' && computerSelection === 'scissors') ||
		(playerSelection === 'scissors' && computerSelection === 'rock')
	) {
		console.log('Computer wins round!')
		winner = 'computer'
		currentScore = { ...currentScore, computer: (currentScore.computer += 1) }
	}
	console.log(currentScore)

	//update UI (step 4)
	setTimeout(() => {
		step4UI(winner)
		scoreDisplay.innerText = `${currentScore.player}:${currentScore.computer}`
	}, 4000)

	if (currentScore.computer >= 3) {
		console.log('COMPUTER WINS')
		resetGame()
	} else if (currentScore.player >= 3) {
		console.log('PLAYER WINS')
		resetGame()
	}
}

function step2UI(playerSelection) {
	backgroundShape.classList.add('hide')
	buttons
		.filter((item) => playerSelection !== item.dataset.selection)
		.map((item) => item.classList.add('hide'))
	//add 'player selection' text
	//add computer placeholder
}

function step3UI(computerSelection) {
	buttons
		.find((item) => computerSelection === item.dataset.selection)
		.classList.remove('hide')
	//add 'computer selection' text
	//change display order
	//handle a draw
}

function step4UI(winner) {
	let winningText
	if (winner === 'player') winningText = 'YOU WIN'
	else if (winner === 'computer') winningText = 'YOU LOSE'
	else if (winner === 'none') winningText = "IT'S A DRAW"
	roundOver.classList.remove('hide')
	document.querySelector('.winner-text').innerText = winningText
	//change layout
	//add winner gradient
}

function newRoundUI() {
	backgroundShape.classList.remove('hide')
	buttons.map((item) => item.classList.remove('hide'))
	roundOver.classList.add('hide')
}
function resetGame() {
	currentScore = { computer: 0, player: 0 }
	newRoundUI()
}

// function game() {
// 	let computerScore = 0
// 	let playerScore = 0
// 	for (let i = 0; i < 5; i++) {
// 		singleRound()
// 		console.log(winner)
// 		if (winner === 'player') {
// 			playerScore++
// 		} else if (winner === 'computer') {
// 			computerScore++
// 		}
// 	}
// 	console.log(computerScore)
// 	console.log(playerScore)
// }

//add rules modal
//use random generator library
