const cells = document.querySelectorAll('.cell');
const statusO =  document.getElementById('status');
const restart = document.getElementById('restart');
const winLine = document.getElementById('winLine');

const winningPattern = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]

let gameIsLive = true;
let currentPlayer = "X";
let inputs = ['','','','','','','','',''];


cells.forEach((cell) => {
    cell.addEventListener('click', () => {
    const index = cell.getAttribute('data-index');
      if (gameIsLive && inputs[index] === '') {
        inputs[index] = currentPlayer;
        cell.textContent = currentPlayer;
         checkIfWon();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    })
})

const checkIfWon = () => {
    for(pat of winningPattern){
       const [a,b,c] = pat;
        if(inputs[a] && inputs[a] === inputs[b] && inputs[a] === inputs[c]){
            gameIsLive = false;
            statusO.innerHTML = `${currentPlayer} has won!`;
            drawWinLine(a, c); // Draw the line between the first and last cell of the winning pattern
            return;
        }
    }
    if (!inputs.includes('')) {
        gameIsLive = false;
        statusO.innerHTML = 'It is a draw!';
    }
};

const drawWinLine = (startIdx, endIdx) => {
    const startCell = cells[startIdx].getBoundingClientRect();
    const endCell = cells[endIdx].getBoundingClientRect();
    const boardRect = document.querySelector('.board').getBoundingClientRect();

    // Calculate start and end positions
    const x1 = startCell.left + startCell.width / 2 
    // - boardRect.left;
    const y1 = startCell.top + startCell.height / 2 
    // - boardRect.top;
    const x2 = endCell.left + endCell.width / 2 
    // - boardRect.left;
    const y2 = endCell.top + endCell.height / 2 
    // - boardRect.top;

    // Calculate line length and angle
    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) 
    * (180 / Math.PI);

    // Apply styles to draw the line
    winLine.style.display = 'block';
    winLine.style.width = `${length}px`;
    winLine.style.left = `${x1}px`;
    winLine.style.top = `${y1}px`;
    winLine.style.transform = `rotate(${angle}deg)`;
};

restart.addEventListener('click', () => {
    gameIsLive = true;
    currentPlayer = "X";
    inputs = ['','','','','','','','',''];
    statusO.innerHTML = '';
    winLine.style.display = 'none';
    cells.forEach((cell) => {
        cell.textContent = '';
    });
});
