const cells = Array.from(document.querySelectorAll('.cell'));
let player = 'X';
let score = { X : 0 , O : 0}

const winCom = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

    
cells.forEach(cell =>{
    cell.addEventListener('click', handleClick)
})

startGame()

function handleClick(e){
    if(e.target.innerText === ''){
        e.target.innerText = player;
        checkWinner();
        // addSign(e)
        // checkDraw();
        switchPlayer();

    }
    
}

function switchPlayer(){
    player = player === 'X' ? 'O' : 'X';
}

function checkWinner(){
    const matched = winCom.some(comb =>
        comb.every(index => cells[index].innerText == player)
    )

    if(matched){
        setTimeout(startGame, 100)
        alert(`Player ${player} won`);
        if(player == 'X'){
            score.X++;
        }else{
            score.O++;
        }
    }
    else{
        if(cells.every(cell => cell.innerText != "")){
            alert('Draw');
            setTimeout(startGame, 500)
            // startGame()
        }
    }
    // console.log(matched);
}

function startGame(){
    const scoreX = document.querySelector('#scoreX');
    const scoreO = document.querySelector('#scoreO');
    scoreX.innerText = score.X;
    scoreO.innerText = score.O;
    player = 'X';
    cells.forEach(cell => cell.innerText = '')
}






















/*
let player = "X";
let score = { x: 0, o: 0 };
const winCom = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6],
];

const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
cell.addEventListener("click", handleClick);
});

startGame();

function startGame() {
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
scoreX.innerText = `Player X score: ${score.x}`;
scoreO.innerText = `Player O score: ${score.o}`;
cells.forEach((cell) => (cell.innerText = ""));
}

function handleClick(e) {
if (e.target.innerText === "") {
    e.target.innerText = player;
    checkWinner();
    switchPlayer();
}
}

function checkWinner() {
const matched = winCom.some((comb) =>
    comb.every((ci) => cells[ci].innerText == player)
);

if (matched) {
    alert(`Player ${player}: You Won !!`);
    if (player === "X") {
    score.x += 1;
    } else {
    score.o += 1;
    }
    startGame();
} else {
    const cellsArray = Array.from(cells);
    if (cellsArray.every((cell) => cell.innerText != "")) {
    alert("Match Draw!!");
    startGame();
    }
}
}

function switchPlayer() {
player = player === "X" ? "O" : "X";
}
*/



























