function printError(errorCode, hint) {
    switch (errorCode) {
        case 1:
            console.log(`${hint} an invalid index, please try again`);
            break;
        case 2:
            console.log(`${hint} is not empty, choose different index`);
            break;
        default:
            console.log('An unknown error happened');

    }
}


function GameBoard() {

    let gameBoard = Array.from({ length: 9 }, (_, index) => index+1);

    const printBoard = () => {
        for (let x = 0; x <= 6; x += 3) {
            console.log(`${gameBoard[x].symbol} | ${gameBoard[x+1].symbol} | ${gameBoard[x+2].symbol}`);
        }
    }

    const checkWinner = () => {
        for (let x = 0; x <= 6; x = x+3) {
            if (gameBoard[x] === gameBoard[x+1] === gameBoard[x+2]) {
                return gameBoard[x];
            }
        }
    
        for (let x = 0; x <= 2; x++) {
            if (gameBoard[x] === gameBoard[x+3] === gameBoard[x+6]) {
                return gameBoard[x];
            }
        }
    
        if (gameBoard[0] === gameBoard[4] === gameBoard[8]) return gameBoard[0];
        if (gameBoard[2] === gameBoard[4] === gameBoard[6]) return gameBoard[2];
    }

    return {printBoard, checkWinner};
}


(function GameController() {

    const board = GameBoard();

    const newPlayers = () => {

        let name1 = prompt("Player 1's name: ");
        console.log(`${name1} your symbol is: X`);
        
        let name2 = prompt("Player 2's name: ");
        console.log(`${name2} your symbol is: O`);
    
        const player1 = { name: name1, symbol: 'X', };
        const player2 = { name: name2, symbol: 'O', };
    
        return [player1, player2];
    }

    const playerInput = () => {
        let inputt;
        while (true) {
            inputt = Number(prompt(`${activePlayer.name} turn, enter index: `));
    
            if (isNaN(inputt) || inputt > 9 || inputt < 1) {
                printError(1, inputt);
                continue;
            }
            break;
        }
    
        return inputt-1;
    }

    const switchActivePlayer = () => {
        (activePlayer == player1) ? (activePlayer = player2) : (activePlayer = player1);
    }

    const semiRound = () => {
        let indexx;
        
        while(true) {
            indexx = playerInput(activePlayer);
        
            if (!(typeof board[indexx] === 'number')) {
                printError(2, indexx);
                continue;
            }
            board[indexx] = activePlayer;
            break;
        }
        switchActivePlayer();
    }


    const announceWinner = (player) => {
        console.log(`${player.name} with symbol ${player.symbol} wins !`);
    } 



    board.printBoard();  // print the empty board
    const [player1, player2] = newPlayers();  // ask for the player's name
    let activePlayer = player1; // player1 will start the game by default

    let winner;

    for (let rounds = 0; rounds < 9; rounds++) {

        semiRound();
        winner = board.checkWinner();
        if (!winner == false) {
            announceWinner(winner);
            break;
        }

        semiRound();
        winner = board.checkWinner();
        if (!winner == false) {
            announceWinner(winner);
            break;
        }
    }

    console.log('TIE !!')
})();