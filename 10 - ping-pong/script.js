document.addEventListener('DOMContentLoaded',()=>{

  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  const scoreDisplay = document.querySelector('#score');
  
  const canvasW = canvas.width;
  const canvasH = canvas.height;
  let x , y; 
  let dx , dy;
  let radius;
  let paddleX , paddleY , paddleW , paddleH; 
  let paddleOX , paddleOY; 
  // let interval;
  let score ;
  
  setVariables()
  showBall()
  myPaddle()
  otherPaddle()
  paddleNavigation()
  moveBall()
  drawCenterLine()
  
  // function moveBall(){
  //     interval = setInterval(()=>{
  //         ctx.clearRect(0, 0, canvasW, canvasH)
  //         x += dx;
  //         y += dy;
  //         paddleOY = y - paddleH/2;
  //         showBall()
  //         myPaddle()
  //         otherPaddle()
  //         detectCollision()
  //         drawCenterLine()
  //         gameOver()
  //         // requestAnimationFrame(moveBall)
  //         // console.log(y, paddleOY)
      
  //     },20)
  // }
  
  function moveBall(){
    ctx.clearRect(0, 0, canvasW, canvasH)
    x += dx;
    y += dy;
    paddleOY = y - paddleH/2;
    showBall()
    myPaddle()
    otherPaddle()
    detectCollision()
    drawCenterLine()
    gameOver()
    requestAnimationFrame(moveBall)

  }


  function setVariables(){
    x = 20;
    y = 40;
    score = 0;
    dx = dy = 2;
    radius = 10;
    paddleX = 0;
    paddleY = 10;
    paddleW = 6;
    paddleH = 60;
    paddleOX = canvasW - paddleW;
    paddleOY = y - paddleH/2;
  }
  
  function detectCollision(){
      
      if(y + dy + radius >= canvasH || y + dy - radius <= 0){
          dy = -dy;
      }
  
      if(x >= 0 && x - radius <= (paddleX + paddleW) ){
          if( y + dy > paddleY && y + dy < (paddleY + paddleH)){
              dx = -dx + 0.2;
              // dy = dy + ((y + dy - paddleY) / 100);
              dy += 0.1;
              score++;
              scoreDisplay.textContent = score;
              // console.log('collide',dy)
          }
      }    
      if(x  <= canvasW && x  >= (paddleOX - radius) ){
          // if( y + dy > paddleOY && y + dy < (paddleOY + paddleH)){
              dx = -dx;
              // dy = dy + ((y + dy - paddleY) / 100);
              // dy += 0.1;
              // console.log('collide',dy)
          // }
      }    
  }
  
  function gameOver(){
    if(x + radius >= canvasW || x  <= 0 + radius){
      alert('game Over!')
      // clearInterval(interval)
      // interval = null;
      setVariables()
      scoreDisplay.textContent = score;
      // moveBall()
    }
  }
  
  function showBall(){
      ctx.beginPath()
      ctx.setLineDash([]);
      ctx.arc(x,y,radius,0,2 * Math.PI)
      ctx.stroke()
      ctx.closePath()
  }
  
  
  function myPaddle(){
      ctx.beginPath()
      ctx.setLineDash([]);
      ctx.rect(paddleX, paddleY, paddleW, paddleH)
      ctx.stroke()
      ctx.closePath()
  }
  
  function otherPaddle(){
      ctx.beginPath()
      ctx.setLineDash([]);
      ctx.rect(paddleOX, paddleOY, paddleW, paddleH)
      ctx.stroke()
      ctx.closePath()
  }
  
  function paddleNavigation(){
      canvas.addEventListener('mousemove',handleMove);
      let canvasTop = canvas.getBoundingClientRect().y;
      function handleMove(e){
          // paddleOY = y - paddleH/2;
          paddleY = Math.floor(e.y - canvasTop) - paddleH/2;
          // console.log(paddleY);
      }
  }
  
  
  function drawCenterLine() {
      ctx.beginPath();
      ctx.setLineDash([5, 5]);       
      ctx.moveTo(canvasW / 2, 0);
      ctx.lineTo(canvasW / 2, canvasH);
      ctx.stroke();
      ctx.closePath();
  }
    
})





























/*
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasH = canvas.height;
const canvasW = canvas.width;

let paddle = { h: 50, w: 5 };
let leftPaddle = (rightPaddle = ball = {});
let score = 0;
let increment = 0.2;

setInitialVariables();
drawBall();
drawLeftPaddle();
drawRightPaddle();
drawScore();
drawCenterLine();
moveBall();
moveLeftPaddle();

function setInitialVariables() {
  ball = { x: 150, y: 150, r: 10, dx: 2, dy: 1 };
  leftPaddle = { x: 0, y: 125 };
  rightPaddle = { x: canvasW - 5, y: 125 };
}

function moveLeftPaddle() {
  document.addEventListener("mousemove", (e) => {
    leftPaddle.y = e.screenY - 350;
  });
}

function detectCollision() {
  //   Detect Right Paddle Collision
  if (ball.x > rightPaddle.x - ball.r) {
    ball.dx = -ball.dx;
  }

  //   Detect Left Paddle Collision
  if (
    ball.x < 0 + ball.r + paddle.w &&
    ball.y > leftPaddle.y &&
    ball.y < leftPaddle.y + paddle.h
  ) {
    ball.dx = -ball.dx + 2 * increment;
    ball.dy += increment;
    score++;
  }

  // Detect Top or Bottom Collision
  if (ball.y > canvasH - ball.r || ball.y < 0 + ball.r) {
    ball.dy = -ball.dy;
  }

  // Detect Left Collision
  if (ball.x < 0 + ball.r) {
    alert("You Loose !");
    setInitialVariables();
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  rightPaddle.y = ball.y - paddle.h / 2;

  ctx.clearRect(0, 0, canvasW, canvasH);

  detectCollision();

  drawBall();
  drawScore();
  drawCenterLine();
  drawLeftPaddle();
  drawRightPaddle();

  requestAnimationFrame(moveBall);
}

function drawRightPaddle() {
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.rect(rightPaddle.x, rightPaddle.y, paddle.w, paddle.h);
  ctx.stroke();
  ctx.closePath();
}
function drawLeftPaddle() {
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.rect(leftPaddle.x, leftPaddle.y, paddle.w, paddle.h);
  ctx.stroke();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
}

function drawScore() {
  ctx.beginPath();
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.fillText("Score: " + score, 20, 10);
  ctx.closePath();
}

function drawCenterLine() {
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(canvasW / 2, 0);
  ctx.lineTo(canvasW / 2, canvasH);
  ctx.stroke();
  ctx.closePath();
}
*/