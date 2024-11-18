// prints different type of error messages based on the errorCode and hint given as arguments
function printError(errorCode, hint) {
    switch (errorCode) {
        case 1:
            console.log(`${hint} an invalid index, please try again`);
            break;
        case 2:
            console.log(`${hint + 1} is not empty, choose different index`);
            break;
        default:
            console.log(`An unknown error happened at ${errorCode} js line number`);
    }
}

// function module which returns functions to print the game board, check for any winner,
// putting the 'X' and 'O' into the board boxes, and to check for any player symbol at any location on board
function GameBoard() {

    let gameBoard = Array.from({ length: 9 }, (_, index) => index+1);

    // print the current gameBoard array
    const printBoard = () => {
        for (let x = 0; x <= 6; x += 3) {
            console.log(`${gameBoard[x]} | ${gameBoard[x+1]} | ${gameBoard[x+2]}`);
        }
        console.log('');
    }

    // checks for any winner, then returns the winner (if any) otherwise returns null
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
        else return null;
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

    return {printBoard, checkWinner, playTurn, checkAtIndex};
}


// anything related to the game flow is done here
function GameController() {

    const [player1, player2] = newPlayers(); 
    let activePlayer = player1;  // activePlayer refers an object

    let board = GameBoard();
    board.printBoard();

    // runs the 9 complete rounds then declared tie!!
    let rounds = 0;
    for (; rounds < 9; rounds++) {

        semiRound();
        let winner = board.checkWinner();
        if (winner !== null) {
            announceWinner(winner);
            break;
        }
    }
    
    if (rounds === 9) console.log('TIE !!')
    

    //// return an array of 2 player objects, each object contains a name and a symbol
    function newPlayers() {

        let name1 = prompt("Player 1's name: ");
        console.log(`${name1} your symbol is: X`);
    
        let name2 = prompt("Player 2's name: ");
        console.log(`${name2} your symbol is: O`);
    
        const player1 = { name: name1, symbol: 'X', };
        const player2 = { name: name2, symbol: 'O', };
    
        return [player1, player2];
    }
    
    
    // asks for an input from the activePlayer until input is integer from 1 to 9 and then return that "input - 1"
    function playerInput() {
        let inputt;
        while (true) {
            inputt = Number(prompt(`${activePlayer.name} with symbol ${activePlayer.symbol} turn, enter index: `));
    
            if (isNaN(inputt) || inputt > 9 || inputt < 1) {
                printError(1, inputt);
                continue;
            }
            break;
        }
    
        return inputt-1;
    }
    
    
    // when called switches the current active player
    function switchActivePlayer() {
        (activePlayer === player1) ? (activePlayer = player2) : (activePlayer = player1);
    };
    
    
    // plays a single turn, then prints current board, then switches active player
    function semiRound() {
        let indexx;
        
        while(true) {
            indexx = playerInput();
        
            if (board.checkAtIndex(indexx) === 'X' || board.checkAtIndex(indexx) === 'O') {
                printError(2, indexx);
                continue;
            }
            board.playTurn(indexx, activePlayer.symbol);
            break;
        }
        board.printBoard();
        switchActivePlayer();
    }
    
    
    // takes a player object and logs it as the winner
    function announceWinner(winner) {
        (winner === 'X') ? (winner = player1) : ((winner === 'O') ? (winner = player2) : (printError(143)));
        console.log(`${winner.name} with symbol ${winner.symbol} wins !`);
    }

    // return {switchActivePlayer, };
}

// GameController();

(function DOMController() {
    const start_btn = document.querySelector('.start');
    start_btn.addEventListener('click', GameController);
})();
