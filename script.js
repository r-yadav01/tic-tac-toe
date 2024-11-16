// gets the players names when new game is started
function getPlayers() {
    let name1 = prompt("Player 1's name: ");
    let name2 = prompt("Player 2's name: ");

    player1 = { name: name1, symbol: 'X', };
    player2 = { name: name2, symbol: 'O', };

    return [player1, player2];
}


function newGameBoard() {  // this will be run as default in the module function
    let newBoard = Array.from({ length: 9 }, (_, index) => index+1);
    return newBoard;
}


// prints the argument array like a tic tac toe board
function printBoard(arrayy) {
    for (let x = 0; x <= 6; x += 3) {
        console.log(`${arrayy[x].symbol} | ${arrayy[x+1].symbol} | ${arrayy[x+2].symbol}`);
    }
}


// will get one of the objects created by the 'getPlayers' function
function playerInput(activePlayer) {
    let inputt;
    while (true) {
        inputt = Number(prompt(`${activePlayer.name} turn, enter location: `).trim());

        if (inputt.isNaN() || inputt > 9 || inputt < 1) {
            printError(1);
            continue;
        }
        break;
    }

    return inputt-1;
}


function printError(errorCode) {
    switch (errorCode) {
        case 1:
            console.log('You entered an invalid index, please try again');
            break;
        case 2:
            console.log('That index is not empty, choose different index');
        
        default:
            console.log('An unknown error happened');

    }
}


// calls the 'playerInput' function to get the active player's input choice(an index location)
function fillBoard(activePlayer, arrayy) {
    let indexx;
    
    while(true) {
        indexx = playerInput(activePlayer);
    
        if (!(typeof arrayy[indexx] === 'number')) {
            printError(2);
            continue;
        }
        arrayy[indexx] = activePlayer;
        break;
    }
}


function checkWinCondition(arrayy) {
    for (let x = 0; x <= 6; x += 3) {
        if (arrayy[x] === arrayy[x+1] === arrayy[x+2]) {
            return arrayy[x];
        }
    }

    for (let x = 0; x <= 2; x++) {
        if (arrayy[x] === arrayy[x+3] === arrayy[x+6]) {
            return arrayy[x];
        }
    }

    if (arrayy[0] === arrayy[4] === arrayy[8]) return arrayy[0];
    if (arrayy[2] === arrayy[4] === arrayy[6]) return arrayy[2];
}


function switchActivePlayer(activePlayer, player1, player2) {
    (activePlayer === player1) ? (activePlayer = player2) : (activePlayer = player1);
}
