const board = document.getElementById('game-board');
const cells = board.getElementsByClassName('cell');
const statusDiv = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;

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

const checkWinner = () => {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return cells[a].textContent;
        }
    }
    return [...cells].every(cell => cell.textContent) ? 'Tie' : null;
};

const handleClick = (event) => {
    const cell = event.target;

    if (!gameActive || cell.textContent) return;

    cell.textContent = currentPlayer;
    const winner = checkWinner();

    if (winner) {
        gameActive = false;
        statusDiv.textContent = winner === 'Tie' ? 'It\'s a tie!' : `${winner} wins!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDiv.textContent = Player `${currentPlayer}'s turn`;
    }
};

const resetGame = () => {
    for (let cell of cells) {
        cell.textContent = '';
    }
    currentPlayer = 'X';
    gameActive = true;
    statusDiv.textContent = Player `${currentPlayer}'s turn`;
};

for (let cell of cells) {
    cell.addEventListener('click', handleClick);
}

resetButton.addEventListener('click', resetGame);

resetGame();