document.addEventListener('DOMContentLoaded',()=>{
    const startBtn = document.querySelector('.start');
    const scoreDisplay = document.querySelector('.score span');
    const squares = document.querySelectorAll('.grid div');
    
    const width = 10;
    // const height = 20;
    let currentIndex = 0;
    let appleInex = 0;
    let currentSnake = [2,1,0];
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;
    

    function startGame(){
        currentSnake.forEach(index =>{squares[index].classList.remove('snake')})
        squares[appleInex].classList.remove('apple');
        clearInterval(interval);
        randomApple()
        score = 0;
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2,1,0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes,intervalTime)
    }
    

    function moveOutcomes(){
        if(
            (currentSnake[0] + width >= (width * width) && direction === width) ||//if snake hits bottom
            (currentSnake[0] % width === width - 1 && direction === 1) || //if snake hits right wall
            (currentSnake[0] % width === 0  && direction === -1) ||  //if snake hits left wall
            (currentSnake[0] - width < 0  && direction === -width) ||  //if snake hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
        ){
            return clearInterval(interval)
        }

        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direction)

        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            randomApple()
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval)
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes,intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }

    function randomApple(){
        do{
            appleInex = Math.floor(Math.random() * squares.length); 
        }while(squares[appleInex].classList.contains('apple'))
        squares[appleInex].classList.add('apple')
        // squares.forEach(square => square.classList.remove('apple'));
        // squares[Math.floor(Math.random() * squares.length)].classList.add('apple');
    }

    function control(e){
        squares[currentIndex].classList.remove('snake')

        if(e.keyCode == 39){
            direction = 1;
        }else if(e.keyCode == 38){
            direction = -width;
        }else if(e.keyCode == 37){
            direction =  -1;
        }else if(e.keyCode == 40){
            direction = +width;
        }
    }

    document.addEventListener('keyup',control)
    startBtn.addEventListener('click',startGame)

    
})
























