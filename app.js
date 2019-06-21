/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const RESET_VALUE = 1;
let scores = [0, 0];
let activePlayer = 0;
let current = 0;
let gameLimit;
const diceElement = document.querySelector('.dice');
const dice2Element = document.querySelector('.dice2');
let Gamer = function(name) {
  this.name = name;
};

Gamer.prototype.getScore = function() {
  return this.score;
};

Gamer.prototype.setScore = function(score) {
  if (!this.score) {
    this.score = score;
  }
};

Gamer.prototype.resetScore = function(score) {
  this.score = score;
};

let player1;
let player2;

const initGame = () => {
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  diceElement.style.display = 'none';
  dice2Element.style.display = 'none';
  player1 = new Gamer(prompt('Enter first player name'));
  player2 = new Gamer(prompt('Enter second player name'));
  document.querySelector('#name-0').textContent = player1.name;
  document.querySelector('#name-1').textContent = player2.name;
};

initGame();

const getRandomDice = () => {
  return Math.floor(Math.random() * 6) + 1;
};

const changeDice = (element, dice) => {
  element.src = `dice-${dice}.png`;
  element.style.display = 'block';
};

const hideDice = () => {
  diceElement.style.display = 'none';
  dice2Element.style.display = 'none';
};

const setGameLimit = () => {
  const gameLimitElement = document.querySelector('.game-limit');
  gameLimit = gameLimitElement.value ? +gameLimitElement.value : 100;
};

document.querySelector('.btn-roll').addEventListener('click', function() {
  let dice = getRandomDice();
  let dice2 = getRandomDice();

  changeDice(diceElement, dice);
  changeDice(dice2Element, dice2);

  if ([dice, dice2].includes(RESET_VALUE) || dice === dice2) {
    changePlayer();
  } else {
    current += dice + dice2;
    document.getElementById('current-'+activePlayer).textContent = current;

    if (!gameLimit) {
      setGameLimit();
    }

    if (scores[activePlayer] + current >= gameLimit) {
      alert(`Player ${activePlayer} won!!!`);
    }
  }
});

const changePlayer = () => {
  current = 0;
  document.getElementById('current-'+activePlayer).textContent = 0;
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
  activePlayer = +!activePlayer;
  hideDice();
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
};

document.querySelector('.btn-hold').addEventListener('click', function() {
  scores[activePlayer] += current;
  document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
  changePlayer();
});

document.querySelector('.btn-new').addEventListener('click', function() {
  initGame();
});
