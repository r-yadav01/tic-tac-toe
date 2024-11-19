// prints different type of messages based on the code and hint given as arguments
function statusPrinter(code, hint="Unknown") {
    let game_status = document.querySelector('.game_status');

    switch (code) {
        case 1:  // if anyone player wins
            game_status.textContent = `${hint.name} with symbol '${hint.symbol}' wins !`
            break;
        case 2:
            game_status.textContent = `clicked box is not empty, choose another`;
            break;
        case 3:
            game_status.textContent = `${hint.name}, with symbol '${hint.symbol}' , it's your turn`;
            break;
        case 4:  // for any tie
            game_status.textContent = hint;
            break;
        default:
            console.log(`An unknown error happened, code: ${code} and hint: ${hint}`);
            break;
    }
}

// function module which returns functions to print the game board, check for any winner,
// putting the 'X' and 'O' into the board boxes, and to check for any player symbol at any location on board
function GameBoard() {

    let gameBoard = Array.from({ length: 9 }, () => '');

    // checks for any winner, then returns the winner's symbol, or tie (if any) otherwise returns null
    const checkWinner = () => {
        for (let x = 0; x <= 6; x = x+3) {
            if (gameBoard[x] === gameBoard[x+1] && gameBoard[x+1] === gameBoard[x+2]) {
                return gameBoard[x];
            }
        }

        for (let x = 0; x <= 2; x++) {
            if (gameBoard[x] === gameBoard[x+3] && gameBoard[x+3] === gameBoard[x+6]) {
                return gameBoard[x];
            }
        }

        if (gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8]) return gameBoard[0];
        else if (gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6]) return gameBoard[2];
        else {
            for (let x = 0; x <= 8; x++) {
                if (gameBoard[x] !== 'X' && gameBoard[x] !== 'O') return null;
            }
            return "IT'S A TIE !!";
        }
    }

    // only function which can edit the gameBoard array
    // takes the symbol(2nd arg) and put it at the index(1st arg) specified
    const playTurn = (indexx, symbol) => {
        gameBoard[indexx] = symbol;
    }

    // returns the element at the indexx(1st arg) from the gameBoard array
    const checkAtIndex = (indexx) => {
        return gameBoard[indexx];
    }

    return {checkWinner, playTurn, checkAtIndex};
}


(function DOMController() {

    let player1, player2;
    const board = GameBoard();
    let activePlayer;
    const boxes = document.querySelectorAll('.boxes button');
    
    const start_btn = document.querySelector('.start');
    start_btn.addEventListener('click', startGame);    // start button click event

    function startGame() {
        start_btn.removeEventListener('click', startGame);
        start_btn.textContent = 'RESTART';
        start_btn.addEventListener('click', restartGame);

        [player1, player2] = newPlayers();  // prompt for the players name
        activePlayer = player1;

        boxes.forEach((box) => {  // adding click eventlisteners to all the boxes
            box.addEventListener('click', boxClickEvent)
        })
    }

    function restartGame() {
        location.reload();
    }

    function boxClickEvent(e) {
        let dataBox = e.target.dataset.box;

        // check if the clicked box is empty
        if (board.checkAtIndex(dataBox) === 'X' || board.checkAtIndex(dataBox) === 'O') {
            statusPrinter(2, dataBox);
        }
        else {
            e.target.textContent = activePlayer.symbol;
            board.playTurn(dataBox, activePlayer.symbol);
            const result = board.checkWinner();

            if (result === 'X' || result === 'O') {
                announceWinner(result);
                endGame();
                return;
            }
            else if (result === "IT'S A TIE !!") {  // if tie
                statusPrinter(4, result);
                endGame();
                return;
            }
            switchActivePlayer();
        }
    }

    // removes click event listeners from all boxes
    function endGame() {
        boxes.forEach(box => {
            box.removeEventListener('click', boxClickEvent);
        })
    }

    function newPlayers() {
        let name1, name2;

        while (!name1) {
            name1 = prompt("Player 1's name: ");
        }
        
        while (!name2) {
            name2 = prompt("Player 2's name: ");
        }
    
        const player1 = { name: name1, symbol: 'X', };
        const player2 = { name: name2, symbol: 'O', };
    
        return [player1, player2];
    }

    // when called switches the current active player
    function switchActivePlayer() {
        activePlayer = (activePlayer === player1) ? player2 : player1;
        statusPrinter(3, activePlayer);
    };

    function announceWinner(winner) { 
        if (winner === 'X') statusPrinter(1, player1);
        else if (winner === 'O') statusPrinter(1, player2);
        else statusPrinter(10, winner);
    }

})();
