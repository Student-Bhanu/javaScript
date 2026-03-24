// using default operator( || )
let scores = JSON.parse(localStorage.getItem('scores')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

// event listeners to gestures
const rock = document.querySelector('.js-rock-event');
rock.addEventListener('click', () => {
    playerGame('rock');
});

const paper = document.querySelector('.js-paper-event');
paper.addEventListener('click', () => {
    playerGame('paper');
});

const scissors = document.querySelector('.js-scissors-event');
scissors.addEventListener('click', () => {
    playerGame('scissors');
});

const resetScores = document.querySelector('.js-reset-scores-event');
resetScores.addEventListener('click', () => {
    scores.wins = 0;
    scores.losses = 0;
    scores.ties = 0;

    localStorage.removeItem('scores');
    updateGreets(null);
    updateMessage(null, null);
});

document.body.addEventListener('keydown', event => {
    if(event.key === 'r'){
        playerGame('rock');
    }
    else if(event.key === 'p'){
        playerGame('paper');
    }
    else if(event.key === 's'){
        playerGame('scissors');
    }
});

const autoPlayElemet = document.querySelector('.js-auto-play-event');
autoPlayElemet.addEventListener('click', autoPlay);

// if value does not exist in localStorage then it will return null(nothing), so when we try to access the value , we get an error

function playerGame(PlayerMove) {
    const computerGuess = pickComputerMove();
    let result = '';
    if (PlayerMove === 'rock') {
        if (computerGuess === 'rock') {
            scores.ties++;
            result = 'tie';
        }
        else if (computerGuess === 'paper') {
            scores.losses++;
            result = 'lose';
        }
        else {
            scores.wins++;
            result = 'win';
        }
    }
    else if (PlayerMove === 'paper') {
        if (computerGuess === 'rock') {
            scores.wins++;
            result = 'win';
        }
        else if (computerGuess === 'paper') {
            scores.ties++;
            result = 'tie';
        }
        else {
            scores.losses++;
            result = 'lose';
        }
    }
    else {
        if (computerGuess === 'rock') {
            scores.losses++;
            result = 'lose';
        }
        else if (computerGuess === 'paper') {
            scores.wins++;
            result = 'win';
        }
        else {
            scores.ties++;
            result = 'tie';
        }
    }

    updateGreets(result);
    updateMessage(PlayerMove, computerGuess);
    updateScores();

    localStorage.setItem('scores', JSON.stringify(scores));
}

function pickComputerMove() {
    let randomNum = Math.round(Math.random() * 10) % 3;
    let computerGuess = '';
    if (randomNum === 0) {
        computerGuess = 'rock';
    }
    else if (randomNum === 1) {
        computerGuess = 'paper';
    }
    else {
        computerGuess = 'scissors';
    }
    return computerGuess;
}


function updateScores() {
    const scoreElement = document.querySelector('.js-scores');
    scoreElement.innerText = `wins : ${scores.wins}, lose : ${scores.losses}, ties : ${scores.ties}`;
}

function updateMessage(playerMove, computerGuess) {
    const messageElement = document.querySelector('.js-message');
    if (playerMove === null && computerGuess === null) {
        messageElement.innerHTML = '';
    }
    else {
        messageElement.innerHTML = `You
        <img class="gesture" src="images/${playerMove}-emoji.png" alt="">
        <img class="gesture" src="images/${computerGuess}-emoji.png" alt="">
        Computer`;
    }

    updateScores();
}

function updateGreets(result) {
    const greetElement = document.querySelector('.js-greets');

    if (result === 'lose' || result === 'win') {
        greetElement.innerText = `You ${result}`;
    }
    else if (result === 'tie') {
        greetElement.innerText = `Match Tie`;
    }
    else {
        greetElement.innerText = '';
    }
}

let intervalId = null;

function autoPlay() {
    if (!intervalId) {
        intervalId = setInterval(() => {
            let playerMove = pickComputerMove();
            playerGame(playerMove);
        }, 500);
    }
    else {
        clearInterval(intervalId);
        intervalId = null;
    }
}

function change() {
    const autoPlayButton = document.querySelector('.auto-play-button');
    if (autoPlayButton.classList.contains('is-toggled')) {
        autoPlayButton.classList.remove('is-toggled');
    }
    else {
        autoPlayButton.classList.add('is-toggled');
    }
}