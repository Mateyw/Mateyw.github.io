// factory: do sth multiple times
// module: do sth once
// An IIFE (Immediately Invoked Function Expression) is a function that is executed right after it is defined
// It has the following syntax: (function() { /* code */ })();


const displayController = (() => {
    const renderMessage = (message) => {
        document.querySelector('#message').innerHTML = message;
    }

    return {
        renderMessage
    }
})();

const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((cell, index) => {
            boardHTML += `<div class="cell" id="cell-${index}">${cell}</div>`;
        })
        document.querySelector('#gameboard').innerHTML = boardHTML;
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.addEventListener('click', Game.handleClick);
        })

    }

    const update = (index, value) => {
        gameboard[index] = value;
        render();
    }

    const getGameboard = () => gameboard; //indirectly returning the gameboard (cant modify it)

    //return to make accessible
    return {
        render,
        update,
        getGameboard
    }
})(); //IIFE


// factory
const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}

// module
const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector('#player-one-name').value, 'X'),
            createPlayer(document.querySelector('#player-two-name').value, 'O')
        ]

        // wins count for each player
        players.forEach(player => {
            player.wins = 0;
        });


        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => { //foreach usable on arrays only 
            cell.addEventListener('click', handleClick);
        })

    }

    const handleClick = (event) => {
        if (gameOver) {
            return;
        }


        let index = parseInt(event.target.id.split('-')[1]);

        // check if the gameboard is not empty at the index
        if (Gameboard.getGameboard()[index] !== "") {
            return;
        }

        Gameboard.update(index, players[currentPlayerIndex].mark);

        if (checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)) {
            gameOver = true;
            displayController.renderMessage(`${players[currentPlayerIndex].name.toUpperCase()} wins`);

            // incrementing the wins count of the player who won by 1
            if (currentPlayerIndex === 0) {
                document.querySelector('#wins-player-one').textContent = `Wins: ${++players[0].wins}`;
            } else {
                document.querySelector('#wins-player-two').textContent = `Wins: ${++players[1].wins}`;
            }



        } else if (checkForTie(Gameboard.getGameboard())) {
            gameOver = true;
            displayController.renderMessage("It's a tie!");
        }
        // switch to the next player to prevent same player starting every new
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    const restart = () => {
        for (let i = 0; i < 9; i++) {
            Gameboard.update(i, '');
        }
        Gameboard.render();
        gameOver = false;
        document.querySelector('#message').innerHTML = '';
        returnPlayersInput().playerOne.value = '';
        returnPlayersInput().playerTwo.value = '';

    }

    return {
        start,
        handleClick,
        restart
    }

})(); //IIFE



function checkForWin(board) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];

        // if board[a] to check if there is something (an X or an O) at this index, so its not empty
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkForTie(board) {
    return board.every(cell => cell !== ""); // goes over every cell and checks if there is something in every cell in the board (if its filled)
}

const restartBtn = document.querySelector('#restart-btn');
restartBtn.addEventListener('click', () => {
    Game.restart();
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
})

const startBtn = document.querySelector('#start-btn');

let returnPlayersInput = () => {
    let playerOne = document.querySelector('#player-one-name');
    let playerTwo = document.querySelector('#player-two-name');
    return {
        playerOne,
        playerTwo
    }
}

startBtn.addEventListener('click', () => {

    startBtn.disabled = true;

    if (returnPlayersInput().playerOne.value === '' || returnPlayersInput().playerTwo.value === '') {
        alert('Enter a Player name!');
        return;
    }
    else {
        document.querySelector('#player-one').innerHTML = `Player1:<br> ${returnPlayersInput().playerOne.value}`;
        document.querySelector('#player-two').innerHTML = `Player2:<br> ${returnPlayersInput().playerTwo.value}`;
        Game.start();
    }
})
