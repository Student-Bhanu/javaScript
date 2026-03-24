// using default operator( || )
let scores = JSON.parse(localStorage.getItem('scores')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

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