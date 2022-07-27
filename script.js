const moveSelections = ['Rock', 'Paper', 'Scissors'];

function getComputerChoice () {
    let choice = Math.floor(Math.random() * 3);
    console.log(moveSelections[choice]);
}

getComputerChoice ();