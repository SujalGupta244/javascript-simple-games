const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
let score = document.querySelector('#score');

let currentTime = timeLeft.textContent;
let time = null;
let result = 0;

function randomSquare(){
    squares.forEach(square =>{
        square.classList.remove('mole');
    })

    let randomPosition = squares[Math.floor(Math.random() * squares.length)];
    randomPosition.classList.add('mole');

    hitPosition = randomPosition.id;

}

squares.forEach(square =>{
    square.addEventListener('mouseup',()=>{
        if(square.id === hitPosition){
            result++;
            score.textContent = result;
        }
    })
})

function moveMole(){
    time = setInterval(randomSquare,1000);
}


function countDown(){
    currentTime--;
    timeLeft.textContent = currentTime;
    if(currentTime == 0){
        clearInterval(timeId)
        clearInterval(time)
        squares.forEach(square =>{
            square.classList.remove('mole');
        })
        hitPosition = '';
        alert('Game Over! Your final score is' + result)
    }
}

let timeId = setInterval(countDown,1000)

moveMole()























/*
window.addEventListener('DOMContentLoaded',()=>{
    // console.log('hello world');
    // squares.forEach(square => square.classList.add('mole'))
    
    const squares = document.querySelectorAll('.square');
    const timeLeft = document.querySelector('#time-left');
    const scoreBoard = document.querySelector('#score');
    let lastHole;
    let score = 0;
    let timeUp = false;
    let countdown;


    function randTime(min,max){
        return Math.floor(Math.random()* (max - min) + min);
    }

    function randomHole(holes){
        const idx = Math.floor(Math.random() * holes.length);
        const hole = holes[idx];
        if(lastHole == hole){
            return randomHole(holes);
        }
        lastHole = hole;
        return hole;
    }

    function peek(){
        const time = randTime(200,1000);
        const hole = randomHole(squares);
        hole.classList.add('mole')
        setTimeout(()=>{
            hole.classList.remove('mole')
            if(!timeUp) peek();
        },time)
    }

    function startGame(){
        scoreBoard.textContent = 0;
        peek();
        timer(parseFloat(timeLeft.textContent));
        setTimeout(()=>{
            timeUp = true;
        },parseFloat(timeLeft.textContent)*1000)
        // console.log(parseFloat(timeLeft.textContent));
    }

    function timer(seconds){
        const now = Date.now();
        const then = now + (seconds*1000);
        countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now())/1000);
            if(secondsLeft <= 0){
                clearInterval(countdown)
            }
            // console.log(secondsLeft);
            displayTime(secondsLeft);
        }, 1000);
        // timeLeft.textContent = timer(seconds);
    }


    function displayTime(seconds){
        timeLeft.textContent = seconds;
    }

    squares.forEach(square =>{
        square.addEventListener('click',()=>{
            if(square.classList.contains('mole')){
                square.classList.remove('mole');
                score++;
                scoreBoard.textContent = score;
                // console.log('clicked');
            }
        })
    })

    startGame();

})
*/



























