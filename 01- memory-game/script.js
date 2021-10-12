document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
      {
        name: 'fries',
        img: 'images/fries.png',
      },
      {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png',
      },
      {
        name: 'ice-cream',
        img: 'images/ice-cream.png',
      },
      {
        name: 'pizza',
        img: 'images/pizza.png',
      },
      {
        name: 'milkshake',
        img: 'images/milkshake.png',
      },
      {
        name: 'hotdog',
        img: 'images/hotdog.png',
      },
      {
        name: 'fries',
        img: 'images/fries.png',
      },
      {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png',
      },
      {
        name: 'ice-cream',
        img: 'images/ice-cream.png',
      },
      {
        name: 'pizza',
        img: 'images/pizza.png',
      },
      {
        name: 'milkshake',
        img: 'images/milkshake.png',
      },
      {
        name: 'hotdog',
        img: 'images/hotdog.png',
      },
    ];

    cardArray.sort(() => 0.5 - Math.random())
    // console.log(cardArray);
    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];

    function createBoard(){
        for(let i = 0; i < cardArray.length;i++){
            var card = document.createElement('img');
            card.setAttribute('src',`images/blank.png`);
            card.setAttribute('data-id',i);
            card.addEventListener('click',flipCard);
            grid.appendChild(card)
            // console.log(card)
        }
    }


    function checkForMatch(){
        var cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if(cardsChosen[0] == cardsChosen[1] && optionOneId != optionTwoId){
            alert('You found a match');
            cards[optionOneId].setAttribute('src','images/white.png')
            cards[optionTwoId].setAttribute('src','images/white.png')
            cards[optionOneId].style.pointerEvents = 'none';
            cards[optionTwoId].style.pointerEvents = 'none';
            // cards[optionOneId].innerHTML = '<img src="" alt="">'
            // cards[optionTwoId].innerHTML = '<img src="" alt="">'
            cardsWon.push(cardsChosen);
        }else{
            cards[optionOneId].setAttribute('src','images/blank.png')
            cards[optionTwoId].setAttribute('src','images/blank.png')
            // alert('try again');
        }
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
        if(cardsWon.length == cardArray.length/2){
            resultDisplay.textContent = 'Congratulations! You found them all.'
        }
    }


    function flipCard(){
        var cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src',cardArray[cardId].img)
        if(cardsChosen.length === 2){
            setTimeout(checkForMatch, 500);
            // checkForMatch()
            // console.log(cardsChosen);
        }
    }

    createBoard()


});

/*
const cardArray = [
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    }
]

const grid = document.querySelector('.grid');
let lastImg ;
let alt;
window.addEventListener('DOMContentLoaded',()=>{
    const imgs = cardArray.map((item,index) =>{
        return `<div class='gameImg'>
                    <img src="${item.img}" alt="${item.name}">
                    <img src="./images/blank.png" class='blank'>
                </div>`
    }).join('');
    grid.innerHTML = imgs; 
    document.querySelectorAll('.blank').forEach(img =>{
        img.addEventListener('click',flipImg);
    })

    // console.log(imgs);
    
    function flipImg(){
        this.style.transform = `rotateY(90deg)`;
        if(alt == this.previousElementSibling.getAttribute('alt')){
            console.log('this is the same one',this.parentElement,true);
        }
        else{
            setTimeout(()=>{
                lastImg.nextElementSibling.style.transform = `rotateY(0deg)`;
                this.style.transform = `rotateY(0deg)`;
                },2000);
                // console.log(lastImg);
            }
        lastImg = this.previousElementSibling;
        alt = lastImg.getAttribute('alt');
        // console.log(this.previousElementSibling.nextElementSibling);
    }

})
*/
