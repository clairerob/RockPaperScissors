const moveSelections = ['rock', 'paper', 'scissors'];

function getComputerChoice () {
    let choice = Math.floor(Math.random() * 3);
    let computerChoice = moveSelections[choice];
    return computerChoice;
}

const computerSelection = getComputerChoice();
let playerSelection = prompt("Choose your move").toLowerCase();

while (playerSelection !== 'rock' && playerSelection !== 'paper' && playerSelection !== 'scissors') {
    playerSelection = prompt("Please enter rock, paper or scissors");}

function singleRound (computerSelection, playerSelection) {
        if (computerSelection === playerSelection) {
        console.log("It's a draw!");
        } else if (computerSelection === 'rock' && playerSelection === 'paper' || computerSelection === 'paper' && playerSelection === 'scissors' || computerSelection === 'scissors' && playerSelection === 'rock') {
        console.log("Player wins!");
        } else if (playerSelection === 'rock' && computerSelection === 'paper' || playerSelection === 'paper' && computerSelection === 'scissors' || playerSelection === 'scissors' && computerSelection === 'rock') {
        console.log("Computer wins!");
    }
} 

console.log(singleRound(computerSelection, playerSelection));