document.addEventListener('DOMContentLoaded',()=>{

    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.querySelector('#scoreOl')
    
    let snakeW = 10;
    let snakeH = 10;
    let dx = snakeW;
    let dy = 0;
    let score = 0;
    
    let snake = [
        // {x : 40, y : 10}, 
        // {x : 30, y : 10},
        // {x : 20, y : 10}, 
        {x : 10, y : 10}
    ]
    let foodX ,foodY;
    
    let interval;
    let leftPressed = rightPressed = upPressed = downPressed = false;
    const canvasW = canvas.width;
    const canvasH = canvas.height;
    
    showSnake();
    moveSnake();
    randomFood()
    showFood();
    snakeNavigation();
    // createListItem()
    let li = document.createElement('li');
    li.textContent = `Score : ${score}`;
    scoreDisplay.appendChild(li);
    
    // function createListItem(){
    //     let li = document.createElement('li');
    //     li.textContent = score;
    //     scoreDisplay.appendChild(li);
    // }
    
    function showSnake() {
        snake.forEach(snake =>{
            ctx.beginPath();
            ctx.rect(snake.x, snake.y, snakeW, snakeH);
            // ctx.stroke()
            ctx.fillStyle = '#000'
            ctx.fill();
            ctx.closePath();
        })
    }
    
    function moveSnake(){
        if(!interval){
            interval = setInterval(()=>{
                handleDirection()
        
                growSnake()
                const head = {x : snake[0].x + dx , y : snake[0].y + dy}
                snake.unshift(head)
                snake.pop()
        
                ctx.clearRect(0,0,canvasW,canvasH)
                // if(downPressed){
                //     direction = 'y';
                // }
                // snake.forEach(snake => snake[direction] += 2)
                // console.log(snake[0].x, snake[0].y);
                
                showSnake()
                showFood()
                detectCollision()
            },100)
        }
    }
    
    function growSnake(){
        if(snake[0].x == foodX && snake[0].y == foodY){
            snake.push({x: foodX, y: foodY})
            randomFood()
            score++;
            li.textContent = `Score : ${score}`;
        }
    }
    
    function detectCollision(){
        if(snake[0].x == canvasW || snake[0].x < 0 || snake[0].y == canvasH || snake[0].y < 0){
            alert('You Lose!');
            clearInterval(interval)
            interval = null;
            dx = snakeW;
            dy = 0;
            leftPressed = rightPressed = upPressed = downPressed = false;
            snake = [{x : 10, y : 10}]
            moveSnake()
            randomFood()
            score = 0;
            li = document.createElement('li');
            li.textContent = `Score : ${score}`;
            scoreDisplay.appendChild(li);
        }
    
    }
    
    function handleDirection(){
        if(downPressed){
            dy = snakeW;
            dx = 0;
        }
        if(rightPressed){
            dx = snakeW;
            dy = 0;
        }
        if(leftPressed){
            dx = -snakeW;
            dy = 0;
        }
        if(upPressed){
            dy = -snakeW;
            dx = 0;
        }
    }
    
    function randomFood(){
        foodX = Math.floor(Math.random() * 390/10) * 10;
        foodY = Math.floor(Math.random() * 390/10) * 10;
    }
    
    function showFood() {
        ctx.beginPath();
        ctx.rect(foodX, foodY, snakeW, snakeH);
        // ctx.stroke()
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
        // console.log(foodX, foodY);
    }
    
    function snakeNavigation(){
        document.addEventListener('keydown',handleKeyDown)
        document.addEventListener('keyup',handleKeyUp)
    
        function handleKeyDown(e){
            if(e.keyCode === 40){
                // e.preventDefault()
                downPressed = true;
            }
            if(e.keyCode === 38){
                // e.preventDefault()
                upPressed = true;
            }
            if(e.keyCode === 37){
                leftPressed = true;
            }
            if(e.keyCode === 39){
                rightPressed = true;
            }
        }
        function handleKeyUp(e){
            if(e.keyCode === 40){
                // e.preventDefault()
                downPressed = false;
                
            }
            if(e.keyCode === 38){
                // e.preventDefault()
                upPressed = false;
                
            }
            if(e.keyCode === 37){
                leftPressed = false;
                
            }
            if(e.keyCode === 39){
                rightPressed = false;
                
            }
        }
    }
})



/*
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let snakeH = (snakeW = 10);
let canvasH = canvas.height;
let canvasW = canvas.width;
let foodX, foodY;
let interval,
    snake,
    rightPressed,
    leftPressed,
    upPressed,
    downPressed,
    dx,
    dy,
    score;
let rounds = [];

setInitialVariables();
drawSnake();
drawFood();
moveSnake();
randomFood();
snakeNavigation();
showScore();

function showScore() {
    const scoreol = document.getElementById("scoreOl");
    scoreol.innerHTML = rounds
    .map((round) => `<li>Score: ${round.score}</li>`)
    .join(" ");
}

function setInitialVariables() {
    interval = null;
    dx = snakeW;
    dy = 0;
    score = 0;
    rightPressed = leftPressed = upPressed = downPressed = false;
    snake = [{ x: 10, y: 10 }];
}

function randomFood() {
    foodX = Math.floor((Math.random() * 290) / 10) * 10;
    foodY = Math.floor((Math.random() * 290) / 10) * 10;
}

function drawFood() {
    ctx.beginPath();
    ctx.rect(foodX, foodY, snakeW, snakeH);
    ctx.fillStyle = "brown";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.fillText("Score is " + score, 10, 10);
    ctx.closePath();
}

function moveSnake() {
    if (!interval) {
    interval = setInterval(() => {
        handleDirection();

        collisionDetection();

        growSnake();

        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);
        snake.pop();

        ctx.clearRect(0, 0, canvasW, canvasH);
        drawSnake();
        drawFood();
        drawScore();
    }, 100);
    }
}

function collisionDetection() {
    const leftCollision = snake[0].x <= 0;
    const rightCollision = snake[0].x >= canvasW;
    const topCollision = snake[0].y <= 0;
    const bottomCollision = snake[0].y >= canvasH;
    if (
    leftCollision ||
    rightCollision ||
    topCollision ||
    bottomCollision
    ) {
    alert("Game Over !!");
    reset();
    }
}

function reset() {
    clearInterval(interval);
    rounds.push({ score: score });
    showScore();
    setInitialVariables();
    randomFood();
    moveSnake();
}

function growSnake() {
    if (snake[0].x === foodX && snake[0].y === foodY) {
    snake.push({ x: foodX, y: foodY });
    score += 1;
    randomFood();
    }
}

function drawSnake() {
    snake.forEach((snake) => {
    ctx.beginPath();
    ctx.rect(snake.x, snake.y, snakeW, snakeH);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
    });
}

function handleDirection() {
    if (downPressed) {
    dy = snakeW;
    dx = 0;
    }
    if (rightPressed) {
    dx = snakeW;
    dy = 0;
    }
    if (leftPressed) {
    dx = -snakeW;
    dy = 0;
    }
    if (upPressed) {
    dy = -snakeW;
    dx = 0;
    }
}

function snakeNavigation() {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
        downPressed = true;
    }
    if (e.key === "ArrowUp") {
        upPressed = true;
    }
    if (e.key === "ArrowLeft") {
        leftPressed = true;
    }
    if (e.key === "ArrowRight") {
        rightPressed = true;
    }
    }

    function handleKeyUp(e) {
    if (e.key === "ArrowDown") {
        downPressed = false;
    }
    if (e.key === "ArrowUp") {
        upPressed = false;
    }
    if (e.key === "ArrowLeft") {
        leftPressed = false;
    }
    if (e.key === "ArrowRight") {
        rightPressed = false;
    }
    }
}
*/
