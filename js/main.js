/*----- constants -----*/


/*----- app's state (variables) -----*/
let guessIdx;
let guess = [];
let reply = [];
let password;
let gameState;

/*----- cached element references -----*/
const botMsg = document.querySelector('p');
const playAgainBtn = document.getElementById('play-again-btn');
const guessBtns = [...document.querySelectorAll('.guess > button')];

/*----- event listeners -----*/
document.querySelector('article').addEventListener('click', handleGuessChooseClick);
document.querySelectorAll('.guessBtn').addEventListener('click',handleGuessSendClick);
playAgainBtn.addEventListener('click',init);

/*----- functions -----*/
init();
function init() {
    for (let i=0; i < 4; i++) {
        password[i] = getRandomInt(0,6);
    }
    //Clear all guesses and reply colors.
}

function handleGuessChooseClick(evt) {
    let parent = evt.target.parentNode;
    let index = Array.prototype.indexOf.call(parent.children, evt.target);
    guess[index]++;
    if (guess[index] >= 6) {guess = 0;}
    renderGuess();
}

function handleGuessSendClick(evt) {
    //Check guess against password
    //set reply to array [2,1,0,0] for perfect, close, miss, miss
    renderReply();
    victoryCheck();
}

function renderGuess() {
    
}

function renderReply() {

}

function victoryCheck() {
    if (guess === password) {gameState=1;}
    else if (guessIdx >= 10) {gameState=-1;}
}

function getRandomInt(min, max) { //Inclusive of min, exclusive of max.
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}