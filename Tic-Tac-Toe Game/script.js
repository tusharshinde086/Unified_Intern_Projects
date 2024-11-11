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
        cell.classList.remove('x', 'o', 'winning'); // Remove previous player and winning classes
        cell.textContent = '';                       
        cell.style.backgroundColor = '';             

        cell.removeEventListener('click', handleClick); 
        cell.addEventListener('click', handleClick, { once: true });
    });

    setBoardHoverClass(); // Update hover effect for the current player
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
        highlightWinningCells();
    }
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function highlightWinningCells() {
    const currentClass = isXTurn ? 'x' : 'o';
    winningCombinations.forEach(combination => {
        if (combination.every(index => cells[index].classList.contains(currentClass))) {
            combination.forEach(index => cells[index].classList.add('winning'));
        }
    });
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

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

restartButton.addEventListener('click', startGame);
startGame();
