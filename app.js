// Rock, paper, scissors, well
const aiChoiceDisplay = document.getElementById('ai-choice')
const yourChoiceDisplay = document.getElementById('your-choice')
const resultDisplay = document.getElementById('result')
const possibleChoice = document.querySelectorAll('button')

let yourChoise
let aiChoice
let result

possibleChoice.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    yourChoise = e.target.id
    yourChoiceDisplay.innerHTML = yourChoise
    generateAiChoice()
    getResult()
}))

function generateAiChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoice.length)

    if (randomNumber === 1) {
        aiChoice = 'rock'
    }
    if (randomNumber === 2) {
        aiChoice = 'paper'
    }
    if (randomNumber === 3) {
        aiChoice = 'scissors'
    }
    if (randomNumber === 4) {
        aiChoice = 'well'
    }
    aiChoiceDisplay.innerHTML = aiChoice
}

function getResult() {
    if (aiChoice === yourChoise) {
        result = 'its a draw!'
    }
    if (aiChoice === 'rock' && yourChoise === 'paper') {
        result = 'you won!'
    }
    if (aiChoice === 'rock' && yourChoise === 'scissors') {
        result = 'you lost!'
    }
    if (aiChoice === 'rock' && yourChoise === 'well') {
        result = 'you won!'
    }
    if (aiChoice === 'paper' && yourChoise === 'scissors') {
        result = 'you won!'
    }
    if (aiChoice === 'paper' && yourChoise === 'rock') {
        result = 'you lost!'
    }
    if (aiChoice === 'paper' && yourChoise === 'well') {
        result = 'you lost!'
    }
    if (aiChoice === 'scissors' && yourChoise === 'rock') {
        result = 'you won!'
    }
    if (aiChoice === 'scissors' && yourChoise === 'paper') {
        result = 'you lost!'
    }
    if (aiChoice === 'scissors' && yourChoise === 'well') {
        result = 'you won!'
    }
    if (aiChoice === 'well' && yourChoise === 'paper') {
        result = 'you won!'
    }
    if (aiChoice === 'well' && yourChoise === 'rock') {
        result = 'you lost!'
    }
    if (aiChoice === 'well' && yourChoise === 'scissors') {
        result = 'you lost!'
    }
    resultDisplay.innerHTML = result

}


// Memory game
const cardArray = [
    {
        name: 'angry',
        img: 'images/angry.png',
    },
    {
        name: 'exited',
        img: 'images/exited.png',
    },
    {
        name: 'happy',
        img: 'images/happy.png',
    },
    {
        name: 'hurt',
        img: 'images/hurt.png',
    },
    {
        name: 'proud',
        img: 'images/proud.png',
    },
    {
        name: 'sad',
        img: 'images/sad.png',
    },
    {
        name: 'angry',
        img: 'images/angry.png',
    },
    {
        name: 'exited',
        img: 'images/exited.png',
    },
    {
        name: 'happy',
        img: 'images/happy.png',
    },
    {
        name: 'hurt',
        img: 'images/hurt.png',
    },
    {
        name: 'proud',
        img: 'images/proud.png',
    },
    {
        name: 'sad',
        img: 'images/sad.png',
    },
]

cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const scoreDisplay = document.querySelector('#score')
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/red.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridDisplay.append(card)
    }
}
createBoard()

function checkMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]
    if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/red.png')
        cards[optionTwoId].setAttribute('src', 'images/red.png')
    }
    if (cardsChosen[0] == cardsChosen[1]) {
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
    } else {
        cards[optionOneId].setAttribute('src', 'images/red.png')
        cards[optionTwoId].setAttribute('src', 'images/red.png')
    }
    scoreDisplay.textContent = cardsWon.length
    cardsChosen = []
    cardsChosenIds = []

    if (cardsWon.length == cardArray.length / 2) {
        scoreDisplay.textContent = 'You found all maches!'
    }
}

function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500)
    }
}

// Wrac-a-mole
const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const hits = document.querySelector('#hits')

let wrac = 0
let hitPosition
let currentTime = 60
let timerId = null

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)]
    randomSquare.classList.add('mole')

    hitPosition = randomSquare.id
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
        wrac++
        hits.textContent = wrac
        hitPosition = null
         }
    })
})

function moveMole() {
    timerId = setInterval(randomSquare, 700)
}

moveMole()

function countDown() {
currentTime--
timeLeft.textContent = currentTime

if (currentTime ==0) {
    clearInterval(countDownTimerId)
    clearInterval(timerId)
    alert('GAME OVER! You hit ' + wrac + ' faces')
}
}

let countDownTimerId = setInterval(countDown, 1000)