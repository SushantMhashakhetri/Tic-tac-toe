const cells = document.querySelectorAll('.cell');
const statusO =  document.getElementById('status');
const restart = document.getElementById('restart');


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
            return;
        }
    }
    if (!inputs.includes('')) {
        gameIsLive = false;
        statusO.innerHTML = 'It is a draw!';
    }
}

restart.addEventListener('click', () => {
    gameIsLive = true;
    currentPlayer = "X";
    inputs = ['','','','','','','','',''];
    statusO.innerHTML = '';
    cells.forEach((cells) => {
        cells.textContent = '';
    })
})