const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart');

let isXTurn = true;
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function startGame() {
    isXTurn = true;
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    statusDisplay.textContent = "Player X's Turn";
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'x' : 'o';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        statusDisplay.textContent = "It's a Draw!";
    } else {
        statusDisplay.textContent = `Player ${isXTurn ? 'X' : 'O'} Wins!`;
    }
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function isDraw() {
    return [...cells].every(cell => cell.classList.contains('x') || cell.classList.contains('o'));
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass.toUpperCase();
}

function swapTurns() {
    isXTurn = !isXTurn;
    statusDisplay.textContent = `Player ${isXTurn ? 'X' : 'O'}'s Turn`;
}

function setBoardHoverClass() {
    board.classList.remove('x', 'o');
    board.classList.add(isXTurn ? 'x' : 'o');
}



restartButton.addEventListener('click', startGame);
startGame();
