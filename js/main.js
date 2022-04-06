/*----- constants -----*/
let guessColors = ['#ff3f3f','#4141bf','#3f3f3f','#2b7f2b','#a9bf2f','#bf8f97'];
let replyColors = ['', '#bf961c', '#2b7f2b'];

/*----- app's state (variables) -----*/
let guessIdx;
let guess;
let reply;
let password = [];
let gameState = 0;
   
/*----- cached element references -----*/
const botMsg = document.querySelector('p');
const playAgainBtn = document.getElementById('play-again-btn');
const guessBtns = [...document.querySelectorAll('.guess > button')];
const replyBtns = [...document.querySelectorAll('.reply > button')];
const secretBtns = [...document.querySelectorAll('#secret > div > button')];

/*----- event listeners -----*/
document.querySelector('body').addEventListener('click', handleGuessChooseClick);
document.getElementById('guessBtn').addEventListener('click',handleGuessSendClick);
playAgainBtn.addEventListener('click',init);

/*----- functions -----*/
init();
function init() {
    for (let i=0; i < 4; i++) {
        password[i] = getRandomInt(0,6);
    }
    for (let i=0; i<replyBtns.length; i++) {
        replyBtns[i].style.backgroundColor = '';
    }
    //Clear all guesses and reply colors.
    // guess = new Array(10).fill(new Array(4).fill(-1));
    guess = [
        [-1,-1,-1,-1],
        [-1,-1,-1,-1],
        [-1,-1,-1,-1],
        [-1,-1,-1,-1],
        [-1,-1,-1,-1],
        [-1,-1,-1,-1],
        [-1,-1,-1,-1],
        [-1,-1,-1,-1],
        [-1,-1,-1,-1],
        [-1,-1,-1,-1]
    ]
    botMsg.innerHTML = 'Good luck!'
    renderGuess();
    gameState = 0;
    renderReveal();
    guessIdx = 0;
}

function handleGuessChooseClick(evt) {
    if (guessBtns.includes(evt.target) && (gameState === 0)) {
        let parent = evt.target.parentNode;
        let index = Array.prototype.indexOf.call(parent.children, evt.target);
        guess[guessIdx][index]++;
        if (guess[guessIdx][index] >= 6) {guess[guessIdx][index] = 0;}
        renderGuess();
    }
}

function handleGuessSendClick() {
    if (!guess[guessIdx].includes(-1) && (gameState === 0)) {
        reply = [];
        let passwordDouble = [...password];
        for (let i = 0; i<4; i++) {
            if (guess[guessIdx][i] === password[i]) {
                reply.push(2);
                passwordDouble[i] = -1;
            }
        }
        for (let i=0; i<4; i++) {
            let closeIdx = passwordDouble.indexOf(guess[guessIdx][i]);
            if (closeIdx !== -1) {
                reply.push(1);
                passwordDouble[closeIdx] = -1;
            }
        }
        while (reply.length<4) {reply.push(0);}
        renderReply();
        victoryCheck();
        guessIdx++;
    }
}

function renderGuess() {
    let i=0;
    for (let j = 0; j<guess.length; j++) {
        for (let k=0; k<guess[j].length; k++){
            guessBtns[i].removeAttribute('class');
            if (guess[j][k] !== -1) {
                guessBtns[i].style.backgroundColor = guessColors[guess[j][k]];
            } else {
                guessBtns[i].style.backgroundColor = '';
            }
            i++;
        }
    }
}

function renderReply() {
    for (let i = 0; i<reply.length; i++) {
        replyBtns[4*guessIdx+i].style.backgroundColor = replyColors[reply[i]];
    }
}

function renderReveal() {
    for (let i = 0; i<4; i++) {
        secretBtns[i].style.backgroundColor = (gameState === 0) ? '' : guessColors[password[i]];  
    }
    playAgainBtn.style.visibility = (gameState === 0) ? 'hidden' : 'visible';
}

function victoryCheck() {
    if (guess[guessIdx].toString() === password.toString()) {
        gameState=1;
        botMsg.innerHTML = 'Congratulations, you guessed it!';
        renderReveal();
    }
    else if (guessIdx >= 9) { //One less than the maximum guess because it increments after the function.
        gameState=-1;
        botMsg.innerHTML = 'Not quite, try again?'
        renderReveal();
    }
}

function getRandomInt(min, max) { //Inclusive of min, exclusive of max.
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}