document.addEventListener('DOMContentLoaded', () => {
  const resultDisplay = document.querySelector('#result');
  const squares = document.querySelectorAll('.grid div');
  let width = 15;
  let currentShooterIndex = 202;
  let currentInvaderIndex = 0;
  let alienInvadersTakenDown = [];
  let result = 0;
  let direction = 1;
  let invaderId;

  const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  ];

  alienInvaders.forEach((invader) =>
    squares[currentInvaderIndex + invader].classList.add('invader')
  );

  squares[currentShooterIndex].classList.add('shooter');

  function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter');
    switch (e.keyCode) {
      case 37:
        if (currentShooterIndex % width !== 0) currentShooterIndex--;
        break;
      case 39:
        if (currentShooterIndex % width < width - 1) currentShooterIndex++;
        break;
    }
    squares[currentShooterIndex].classList.add('shooter');

    // shoot(e)
  }

  function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;

    if ((leftEdge && direction == -1) || (rightEdge && direction == 1)) {
      direction = width;
    } 
    else if (direction == width) {
      if (leftEdge) direction = 1;
      else direction = -1;
    }

    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      squares[alienInvaders[i]].classList.remove('invader');
    }

    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      alienInvaders[i] += direction;
    }

    for (let i = 0; i <= alienInvaders.length - 1; i++) {
        if(!alienInvadersTakenDown.includes(i)){
            squares[alienInvaders[i]].classList.add('invader');
        }
    }

    // For game over
    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
      squares[currentShooterIndex].classList.add('boom');
      squares[currentShooterIndex].classList.remove('shooter','invader');
      squares[currentShooterIndex].textContent = '????';
      resultDisplay.textContent = 'Game Over';
      clearInterval(invaderId);
      document.removeEventListener('keydown', moveShooter)
      document.removeEventListener('keyup', shoot)
    }

    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      if (alienInvaders[i] > squares.length - (width - 1)) {
        resultDisplay.textContent = 'Game Over';
        clearInterval(invaderId);
        document.removeEventListener('keydown', moveShooter)
        document.removeEventListener('keyup', shoot)
      }
    }

    if(alienInvadersTakenDown.length === alienInvaders.length){
        resultDisplay.textContent = 'You win';
        clearInterval(invaderId)
    }

  }

  invaderId = setInterval(moveInvaders, 500);

  function shoot(e) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;

    function moveLaser() {
      squares[currentLaserIndex].classList.remove('laser');
      currentLaserIndex -= width;
      squares[currentLaserIndex].classList.add('laser');
      if(squares[currentLaserIndex].classList.contains('invader')) {
        squares[currentLaserIndex].classList.remove('invader');
        squares[currentLaserIndex].classList.remove('laser');
        // squares[currentLaserIndex].classList.add('boom');
        squares[currentLaserIndex].textContent = '????';

        setTimeout(() => {
          // squares[currentLaserIndex].classList.remove('boom');
          squares[currentLaserIndex].textContent = '';
        }, 250);

        clearInterval(laserId);

        const alienTakenDown = alienInvaders.indexOf(currentLaserIndex);
        alienInvadersTakenDown.push(alienTakenDown);
        result++;
        resultDisplay.textContent = result;
      }

      if (currentLaserIndex < width) {
        clearInterval(laserId);
        setTimeout(() => {
          squares[currentLaserIndex].classList.remove('laser');
        }, 100);
      }
    }

    if (e.keyCode == 32) {
        laserId = setInterval(moveLaser, 10);
    }
  }
  document.addEventListener('keydown', moveShooter);
  document.addEventListener('keyup',shoot)
});
