const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.querySelector('.score');
const canvasH = canvas.height;
const canvasW = canvas.width;

let score = 0;
let ball = { x: 300, y: 0, r: 12 };
let platforms = [
  { x: 0, y: canvasH, w: canvasW, h: 15, holeX: randomHoleX(), holeW: 30 },
//   { x: 0, y: 200, w: canvasW, h: 15, holeX: randomHoleX(), holeW: 30 },
];
let platformDiff = 80;
let platformSpeed = 2;
let leftPressed = rightPressed = false;
let interval;

showPlatforms();
showBall();
movePlatforms();
navigateBall();

// ctx.beginPath()
// base_image = new Image();
// base_image.src = 'ball.png';
// base_image.onload = function(){
//     ctx.drawImage(base_image, 0, 0,20,20);
// }
// ctx.closePath()

function randomHoleX() {
  return Math.floor(Math.random() * (canvasW - 100));
}


function movePlatforms(){
    let count = 0;
    if(interval) return;

    interval = setInterval(()=>{

        checkGameOver()
        if(count == platformDiff/ platformSpeed){
            addNewPlatform()
            if(platforms.length > 10){
                platforms.splice(0,4)
            }
            count = 0;
        }
        platforms.forEach(platform =>{
            platform.y -= platformSpeed;
        })
        const closest = platforms.find(pl => ball.y > pl.y - ball.r  && ball.y < pl.y + 10);
        if(closest){
            holdAndDrop(closest)
            // console.log(closest);
        }else{
            ball.y +=5;
        }

        if(ball.y > (canvasH - ball.r)){
            ball.y = canvasH - ball.r
        }
        // console.log(platforms.length);
        ctx.clearRect(0,0, canvasW, canvasH)
        showPlatforms()
        showBall()
        count ++;
    },20)
}

function addNewPlatform(){
    let lastPl = platforms[platforms.length - 1];
    platforms.push({ x: 0, y: lastPl.y + platformDiff, w: canvasW, h: 15, holeX: randomHoleX(), holeW: 30});
}

function holdAndDrop(firstPl){
    // const firstPl = platforms[0];
    if(ball.y > (firstPl.y - ball.r)){
        if(ball.x > firstPl.holeX && ball.x < (firstPl.holeX + firstPl.holeW)){
            ball.y += 5;
            score++ ;
            scoreDisplay.textContent = score;
        }else{
            ball.y = firstPl.y - ball.r;
        }
    }

    if(ball.y > (canvasH - ball.r)){
        ball.y = canvasH - ball.r
    }
    
}

function checkGameOver(){
    if(ball.y < 0){
        alert('Game Over!')
        reset()
    }
}

function reset(){
    ball = { x: 300, y: 0, r: 12 };
    platforms = [
        { x: 0, y: canvasH, w: canvasW, h: 15, holeX: randomHoleX(), holeW: 30 },
      ];
    score = 0;
    scoreDisplay.textContent = score;
    clearInterval(interval)
    interval = null
    movePlatforms()
}

function showBall() {
    
    if(leftPressed && ball.x  - ball.r> 0){
        ball.x -=5;
    }
    if(rightPressed && ball.x + ball.r < canvasW){
        ball.x +=5;
    }
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
  ctx.fillStyle = 'blue';
  // ctx.fillStyle = 'blue';
  ctx.fill();
  //   ctx.stroke();
  ctx.closePath();
}



function showPlatforms() {
  platforms.forEach((platform) => {
    showPlatform(platform);
    showHole(platform);
  });

  function showPlatform(platform) {
    ctx.beginPath();
    ctx.rect(platform.x, platform.y, platform.w, platform.h);
    ctx.fillStyle = '#000';
    ctx.fill();
    // ctx.stroke();
    ctx.closePath();
  }

  function showHole(platform) {
    ctx.beginPath();
    ctx.rect(platform.holeX, platform.y, platform.holeW, platform.h);
    ctx.fillStyle = '#fff';
    ctx.fill();
    // ctx.stroke();
    ctx.closePath();
  }
}

function navigateBall(){
    document.addEventListener('keydown', (e)=>{
        if(e.keyCode == 37){
            leftPressed = true;
        }
        if(e.keyCode == 39){
            rightPressed = true;
        }
        
    })
    document.addEventListener('keyup', (e)=>{
        if(e.keyCode == 37){
            leftPressed = false;
        }
        if(e.keyCode == 39){
            rightPressed = false;
        }
    })
}




/*
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasH = canvas.height;
const canvasW = canvas.width;

let ball = { x: 150, y: 0, w: 15 };
let platformH = 10;
let plSpeed = 1;
let platformW = canvasW;
let plDiff = 50;
let leftPressed = (rightPressed = false);
let moveSpeed = 2;
let score = 0;
let interval = null;
let scoreInterval = null;

function randHoleX() {
return Math.floor(Math.random() * 270);
}

let platforms = [{ x: 0, y: canvasH, holeX: randHoleX(), holeW: 20 }];
drawBall();
drawPlatforms();
movePlatforms();
nagivateBall();

scoreInterval = setInterval(() => {
score++;
}, 1000);

function movePlatforms() {
let count = 0;
if (interval) return;
interval = setInterval(() => {
    checkGameOver();
    if (count === Math.floor(plDiff / plSpeed)) {
    if (platforms.length > 20) {
        platforms.splice(0, 4);
    }
    addNewPlatform();
    count = 0;
    }

    platforms.forEach((pl) => (pl.y -= plSpeed));

    const closest = platforms.find(
    (pl) => ball.y < pl.y + 10 && ball.y > pl.y - ball.w
    );

    if (closest) {
    holdAndDrop(closest);
    } else {
    ball.y += 5;
    }

    ctx.clearRect(0, 0, canvasW, canvasH);

    drawPlatforms();
    drawBall();
    drawScore();
    count++;

    console.log(platforms.length);
}, 20);
}

function checkGameOver() {
if (ball.y < 0) {
    alert("Game Over !!");
    reset();
}
}

function reset() {
ball = { x: 150, y: 0, r: 5 };
platforms = [{ x: 0, y: canvasH, holeX: randHoleX(), holeW: 20 }];
clearInterval(interval);
clearInterval(scoreInterval);
interval = null;
scoreInterval = null;
movePlatforms();
}

function addNewPlatform() {
const lastPlatform = platforms[platforms.length - 1];
platforms.push({
    x: 0,
    y: lastPlatform.y + plDiff,
    holeX: randHoleX(),
    holeW: 20,
});
}

function drawPlatforms() {
platforms.forEach((pl) => {
    createPl(pl);
    createHole(pl);
});

function createHole(pl) {
    ctx.beginPath();
    ctx.rect(pl.holeX, pl.y, pl.holeW, platformH);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function createPl(pl) {
    ctx.beginPath();
    ctx.rect(pl.x, pl.y, platformW, platformH);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}
}

function holdAndDrop(closest) {
if (ball.y > closest.y - ball.w) {
    if (
    ball.x > closest.holeX &&
    ball.x < closest.holeX + closest.holeW
    ) {
    ball.y += 1;
    } else {
    ball.y = closest.y - ball.w;
    }
}
}

function drawBall() {
// Navigation
if (leftPressed && ball.x - ball.w > 0) {
    ball.x -= moveSpeed;
}
if (rightPressed && ball.x + ball.w < canvasW) {
    ball.x += moveSpeed;
}

ctx.beginPath();
const img = new Image();
img.src = "./ball.png";
ctx.drawImage(img, ball.x, ball.y, ball.w, ball.w);
ctx.closePath();
}

function drawScore() {
ctx.beginPath();
ctx.fillStyle = "black";
ctx.fill();
ctx.fillText("Score: " + score, 10, 10);
ctx.closePath();
}

function nagivateBall() {
document.addEventListener("keydown", (e) => {
    if (e.getModifierState("Alt")) {
    if (e.key === "ArrowLeft") {
        moveSpeed = 10;
    }

    if (e.key === "ArrowRight") {
        moveSpeed = 10;
    }
    }

    if (e.key === "ArrowLeft") {
    leftPressed = true;
    }

    if (e.key === "ArrowRight") {
    rightPressed = true;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") {
    leftPressed = false;
    }

    if (e.key === "ArrowRight") {
    rightPressed = false;
    }

    moveSpeed = 2;
});
}
*/
