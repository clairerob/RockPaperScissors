const moveSelections = ['rock', 'paper', 'scissors'];

function getComputerChoice () {
    let choice = Math.floor(Math.random() * 3);
    let computerChoice = moveSelections[choice];
    return computerChoice;
}


let winner = "";

function singleRound () {
    const computerSelection = getComputerChoice();
    let playerSelection = prompt("Choose your move").toLowerCase();

    while (playerSelection !== 'rock' && playerSelection !== 'paper' && playerSelection !== 'scissors') {
        playerSelection = prompt("Please enter rock, paper or scissors");}

        if (computerSelection === playerSelection) {
        console.log("It's a draw!");
        winner = "none";

        } else if (computerSelection === 'rock' && playerSelection === 'paper'
        || computerSelection === 'paper' && playerSelection === 'scissors'
        || computerSelection === 'scissors' && playerSelection === 'rock') {
        console.log("Player wins round!");
        winner = "player";

        } else if (playerSelection === 'rock' && computerSelection === 'paper'
        || playerSelection === 'paper' && computerSelection === 'scissors'
        || playerSelection === 'scissors' && computerSelection === 'rock') {
        console.log("Computer wins round!");
        winner = "computer";
    }
} 


function game() {
    let computerScore = 0;
    let playerScore = 0;
    for (let i = 0; i < 5; i++) {
            singleRound();
            console.log(winner);
            if (winner === "player") {
                playerScore++;
            } else if (winner === "computer") {
                computerScore++;
            }
    } 
    console.log(computerScore);  
    console.log(playerScore);
}

console.log(game());