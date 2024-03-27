let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function makeMove(cellIndex) {
    if (!isGameActive || gameBoard[cellIndex] !== '') return;
    
    gameBoard[cellIndex] = currentPlayer;
    renderBoard();
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    // Call bot move after player's move
    if (isGameActive && currentPlayer === 'O') {
        setTimeout(botMove, 500); // Delay bot move for half a second
    }
}

function checkWinner() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            isGameActive = false;
            document.getElementById('message').innerText = `${currentPlayer} wins!`;
            return;
        }
    }
    if (!gameBoard.includes('')) {
        isGameActive = false;
        document.getElementById('message').innerText = "It's a tie!";
    }
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.innerText = gameBoard[index];
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    document.getElementById('message').innerText = '';
    renderBoard();
}

function botMove() {
    // Check if the bot can win in the next move
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = currentPlayer;
            if (checkWinnerForPlayer(currentPlayer)) {
                renderBoard();
                isGameActive = false;
                document.getElementById('message').innerText = "Bot wins!";
                return;
            }
            gameBoard[i] = ''; // Undo the move
        }
    }

    // Check if the player can win in the next move and block them
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch currentPlayer to simulate opponent
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = currentPlayer;
            if (checkWinnerForPlayer(currentPlayer)) {
                gameBoard[i] = 'O'; // Bot blocks the player
                renderBoard();
                currentPlayer = 'X'; // Switch back to bot's turn
                return;
            }
            gameBoard[i] = ''; // Undo the move
        }
    }
    currentPlayer = 'O'; // Switch back to bot's turn

    // If no winning move or blocking move, make a random move
    const emptyCells = gameBoard.reduce((acc, val, index) => {
        if (val === '') acc.push(index);
        return acc;
    }, []);
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    makeMove(emptyCells[randomIndex]);
}

function checkWinnerForPlayer(player) {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] === player && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

