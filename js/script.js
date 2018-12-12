'use strict';

var output = document.getElementById('output'),
  pickRock = document.getElementById('rock-button'),
  pickPaper = document.getElementById('paper-button'),
  pickScissors = document.getElementById('scissors-button'),
  newGame = document.getElementById('new-game'),
  playerScoreCount = document.getElementById('player-score'),
  computerScoreCount = document.getElementById('computer-score'),
  roundCount = document.getElementById('round-to-play'),
  playerScore = 0,
  computerScore = 0,
  numbOfRounds,
  showButtons = function () {
    pickPaper.classList.toggle('hideButtons');
    pickRock.classList.toggle('hideButtons');
    pickScissors.classList.toggle('hideButtons');
  };

showButtons();

newGame.addEventListener('click', function () {
  numbOfRounds = prompt('How many rounds do you want to play?');
  if (isFinite(numbOfRounds) && numbOfRounds > 0) {
    roundCount.innerHTML = 'You have chosen: ' + numbOfRounds + ' rounds to win the game!';
    showButtons();
  } else {
    roundCount.innerHTML = 'Please, give a number!';
    newGame.classList.toggle('hideButtons');
  };
  newGame.classList.toggle('hideButtons');

  output.innerHTML = '';
  playerScore = 0;
  computerScore = 0;
});

pickRock.addEventListener('click', function () {
  playerMove('rock', computerMove());
  countingScores();
  gameOver();
});

pickPaper.addEventListener('click', function () {
  playerMove('paper', computerMove());
  countingScores();
  gameOver();
});

pickScissors.addEventListener('click', function () {
  playerMove('scissors', computerMove());
  countingScores();
  gameOver();
});

var computerMove = function () {
  var possibles = ['paper', 'rock', 'scissors'];
  var computerChoice = possibles[Math.floor(Math.random() * possibles.length)];
  return computerChoice;
};

var playerMove = function (playerPick, computerPick) {
  if (playerPick === computerPick) {
    output.innerHTML = 'It is DRAW!<br>You chose: ' + playerPick + ' computer chose: ' + computerPick + '<br>';
  } else if ((playerPick === 'paper' && computerPick === 'rock') ||
    (playerPick === 'rock' && computerPick === 'scissors') ||
    (playerPick === 'scissors' && computerPick === 'paper')) {
    output.innerHTML = 'You WON !<br>You chose: ' + playerPick + ' and computer chose: ' + computerPick + '<br>';
    playerScore++;
  } else {
    output.innerHTML = ' You LOST !<br>You chose: ' + playerPick + ' and computer chose: ' + computerPick + '<br>';
    computerScore++;
  };
};
var countingScores = function () {
  playerScoreCount.innerHTML = 'Player score: ' + playerScore;
  computerScoreCount.innerHTML = 'Computer score: ' + computerScore;
};

var gameOver = function () {
  if (playerScore == numbOfRounds || computerScore == numbOfRounds) {
    if (playerScore > computerScore) {
      output.innerHTML = 'GAME OVER! YOU WON ENTIRE GAME';
    } else {
      output.innerHTML = 'GAME OVER! YOU LOST ENTIRE GAME';
    };
    playerScoreCount.innerHTML = '';
    roundCount.innerHTML = '';
    computerScoreCount.innerHTML = '';
    showButtons();
    newGame.classList.toggle('hideButtons');
  }
};