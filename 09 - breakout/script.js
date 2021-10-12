document.addEventListener('DOMContentLoaded',()=>{

  const canvas = document.querySelector('#canvas');
  const startBtn = document.querySelector('#start');
  const scoreDisplay = document.querySelector('.score');
  const ctx = canvas.getContext('2d')
  const canvasW = canvas.width; 
  const canvasH = canvas.height; 
  
  let right,left;
  let x ,y,dx,dy;
  let interval;
  let paddleW, paddleH, paddleX, paddleY;
  let radius;
  let brickOffset, brickW, brickH;
  let score = 0;
  const bricks = [];
  
  
  setVariables();
  showBall();
  showPaddle();
  createBrickArray();
  showBricks();
  paddleNavigation();
  // startGame();
  startBtn.addEventListener('click',startGame)
  
  function detectCollision(){
      if(x > canvasW - 15 || x < 15){
          dx = -dx;            
      }   
      if(y < 15 ){
          dy = -dy;
      }     
  
      if(y >= canvasH - radius){
          if(x + dx > paddleX && x + dx < (paddleX + paddleW)){
              dy = -dy ;
              dx = dx + (x + dx - paddleX) / 100;
          }
          // console.log('collided');
      }
  
      for(let b = 0; b < bricks.length;b++){
          for(let i = 0 ; i < bricks[b].length;i++){
              let brick = bricks[b][i] ;
              // if(x > brick.x && x < (brick.x + brickW)  && y > brick.y && y < (brick.y + brickH + radius)){
              if(brick.isVisible){
                  if(x > brick.x && x < (brick.x + brickW)  && y > brick.y && y < (brick.y + brickH)){
                      dy = -dy;
                      // console.log('collide');
                      // brick.isVisible = false;
                      bricks[b][i].isVisible = false;
                      score++;
                      scoreDisplay.textContent = score;
                      won()
                  }
              }
              
          }
      }
      // for(let i of bricks){
      //     if(y + dx <= i[1] + brickH + radius){
      //         if(x + dx > i[0] && x + dx < (i[0] + brickW)){
      //             console.log('collided bricks');
      //             // ctx.clearRect(0,0, brickW, brickH)
      //             dy = -dy;
      //         }
      //     }
      //     // console.log(i);
      // }
      
  }
  
  
  
  function paddleNavigation(){
      document.addEventListener('keydown',handleKeyDown)
      document.addEventListener('keyup',handleKeyUp)
  
      function handleKeyDown(e){
          if(e.keyCode == 37){
              left = true;
  
            }
            if(e.keyCode == 39){
              right = true;
          }
      }
  
      function handleKeyUp(e){
          if(e.keyCode == 37){
              left = false;
          }
          if(e.keyCode == 39){
              right = false;
          }
  
      }
  
  }
  
  
  function startGame(){
      if(!interval){
          interval = setInterval(()=>{
              if(left){
                  paddleX -=4;
              }
              if(right){
                  paddleX +=4;
              }
              ctx.clearRect(0,0,canvasW,canvasH)
              detectCollision()
              x+= dx;
              y+= dy;
              gameOver()
              showBall()
              showPaddle();
              showBricks();
              // console.log(x,dx,'|||',y,dy)
          },10)
      }
  }
  
  
  
  
  function setVariables(){
      x = canvasW/2;
      y = canvasH - 25;
      dx = 4;
      dy = -4;
      radius = 15;
      paddleW = 60;
      paddleH = 15;
      paddleX = canvasW/2 - paddleW/2;
      paddleY = canvasH - 10;
      left = false;
      right = false;
      brickW = 60;
      brickH = 12;
      brickOffset = 10;
  
      for(let b = 0; b < bricks.length;b++){
          for(let i = 0 ; i < bricks[b].length;i++){
              let brick = bricks[b][i] ;
              // brick.isVisible = false;
              bricks[b][i].isVisible = true;
          }
      }
  
      score = 0;
      scoreDisplay.textContent = score;
  
  }
  
  function gameOver(){
      if(y >= canvasH){
          alert('game over')
          clearInterval(interval)
          interval = null;
          setVariables();
      }
  }
  
  
  function won(){
      
      if(score == 28){
          alert('Congratulaitons! You won')
          clearInterval(interval);
          interval = null;
          setVariables();
          
          // for(let b = 0; b < bricks.length;b++){
          //     for(let i = 0 ; i < bricks[b].length;i++){
          //         let brick = bricks[b][i] ;
          //         // brick.isVisible = false;
          //         bricks[b][i].isVisible = true;
          //     }
          // }
          
          // score = 0;
          // scoreDisplay.textContent = score;
      }
  }
  
  
  function showBall(){
      ctx.beginPath()
      ctx.arc(x,y,radius,0,2 * Math.PI,false)
      ctx.fillStyle = '#389393';
      // ctx.strcolumnskeStyle = '#52057b';
      ctx.fill()
      ctx.stroke()
      ctx.closePath()
  }
  
  
  function showPaddle(){
      ctx.beginPath()
      ctx.rect(paddleX, paddleY, paddleW, paddleH)
      ctx.fillStyle = '#3797a4';
      // ctx.strokeStyle = 'green';
      ctx.fill()
      ctx.stroke()
      ctx.closePath()
      
  }
  
  function createBrickArray(){
      for(let j = 0; j < 4 ; j++){
          bricks[j] = []
          for(let i = 0; i < 7 ; i++){
              bricks[j][i] = {x: 0, y: 0, isVisible: true}
          }
          // console.log(bricks);
      }
  }
  
  function showBricks(){
      for(let j = 0; j < 4 ; j++){
          // bricks[j] = []
          for(let i = 0; i < 7 ; i++){
              if(bricks[j][i].isVisible){
                  // ctx.clearRect(brick.x,brick.y, brickW, brickH)
                  const brickX = 10 + i * (brickW + brickOffset);
                  const brickY =  10 + j * ( brickH + brickOffset);
                  // bricks[j][i] = {x: brickX, y: brickY}
                  bricks[j][i].x = brickX;
                  bricks[j][i].y = brickY;
                  ctx.beginPath()
                  ctx.rect(brickX, brickY, brickW, brickH)
                  ctx.fillStyle = '#3797a4';
                  ctx.strokeStyle = '#3797a4';
                  ctx.fill()
                  ctx.stroke()
                  ctx.closePath()
              }
  
          }
      }
  }

})








/*
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasH = canvas.height;
const canvasW = canvas.width;

let rightPressed = false;
let leftPressed = false;
let x,
  y,
  dy,
  dx,
  interval,
  radius,
  paddleW,
  paddleX,
  paddleY,
  brickW,
  brickH,
  brickOffset;
let bricks = [];
let score = 0;
let brickCount = 12;
let brickRows = 6;
setVariables();
drawBall();
drawPaddle();
createBrickArray();
drawBricks();
drawScore();
paddleNavigation();
// startGame()

function drawScore() {
  ctx.beginPath();
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.fillText("Score: " + score, 9, 10);
  ctx.closePath();
}

function createBrickArray() {
  for (let j = 0; j < brickRows; j++) {
    bricks[j] = [];
    for (let i = 0; i < brickCount; i++) {
      bricks[j][i] = { x: 0, y: 0, isVisible: true };
    }
  }
}

function drawBricks() {
  for (let j = 0; j < brickRows; j++) {
    for (let i = 0; i < brickCount; i++) {
      if (bricks[j][i].isVisible) {
        const brickX = 10 + i * (brickW + brickOffset);
        const brickY = (10 + brickOffset) * (j + 1);
        bricks[j][i].x = brickX;
        bricks[j][i].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickW, brickH);
        ctx.fillStyle = "#3797a4";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function paddleNavigation() {
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);

  function handleKeyDown(e) {
    if (e.key === "ArrowRight") {
      rightPressed = true;
    }
    if (e.key === "ArrowLeft") {
      leftPressed = true;
    }
  }

  function handleKeyUp(e) {
    if (e.key === "ArrowRight") {
      rightPressed = false;
    }
    if (e.key === "ArrowLeft") {
      leftPressed = false;
    }
  }
}

function detectCollision() {
  if (x + dx >= canvasW || x + dx < 0) {
    dx = -dx;
  }

  if (y + dy > canvasH - radius) {
    if (x + dx > paddleX && x + dx < paddleX + paddleW) {
      dy = -dy;
      dx = dx + (x + dx - paddleX) / 100;
    }
  }

  if (y + dy < 0) {
    dy = -dy;
  }

  for (let b = 0; b < bricks.length; b++) {
    for (let i = 0; i < bricks[b].length; i++) {
      const brick = bricks[b][i];
      if (brick.isVisible) {
        if (
          x > brick.x &&
          x < brick.x + brickW &&
          y > brick.y &&
          y < brick.y + brickH
        ) {
          bricks[b][i].isVisible = false;
          score += 1;
          dy = -dy;
          checkYouWon();
        }
      }
    }
  }
}

function startGame() {
  if (!interval) {
    interval = setInterval(() => {
      if (rightPressed) {
        paddleX = paddleX + 5;
      }
      if (leftPressed) {
        paddleX = paddleX - 5;
      }
      detectCollision();
      x = x + dx;
      y = y + dy;
      checkGameover();
      ctx.clearRect(0, 0, canvasW, canvasH);
      drawPaddle();
      drawBall();
      drawBricks();
      drawScore();
    }, 20);
  }
}

function checkGameover() {
  if (y === canvasH) {
    alert("game over");
    clearInterval(interval);
    interval = null;
    setVariables();
  }
}

function checkYouWon() {
  if (score === 18) {
    alert("You Won !!");
    clearInterval(interval);
    interval = null;
    setVariables();
  }
}

function setVariables() {
  x = canvasW / 2;
  y = canvasH - 20;
  dx = 5;
  dy = -5;
  radius = 10;
  paddleW = 50;
  paddleX = canvasW / 2 - paddleW / 2;
  paddleY = canvasH - 10;

  brickW = 40;
  brickH = 10;
  brickOffset = 8;
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = "#389393";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleW, 10);
  ctx.fillStyle = "#3797a4";
  ctx.fill();
  ctx.closePath();
}*/















