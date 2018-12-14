'use strict';

var params = {
  output: document.getElementById('output'),
  selectMove: document.getElementsByClassName('player-move'),
  result: document.getElementById('result'),
  newGame: document.getElementById('new-game'),
  playerScoreCount: document.getElementById('player-score'),
  computerScoreCount: document.getElementById('computer-score'),
  roundCount: document.getElementById('round-to-play'),
  playerScore: 0,
  computerScore: 0,
  numbOfRounds: 0,
  winner: '',
  progress: []
};

var closeButtons = document.querySelectorAll('.close');
var modals = document.querySelectorAll('.modal');

var showButtons = function() {
  for (var i = 0; i < params.selectMove.length; i++) {
    params.selectMove[i].classList.toggle('hideButtons');
  }
};

showButtons();

params.newGame.addEventListener('click', function() {
  params.numbOfRounds = prompt('How many rounds would you like to play?');

  if (isFinite(params.numbOfRounds) && params.numbOfRounds > 0) {
    params.roundCount.innerHTML = 'You have chosen: ' + params.numbOfRounds + ' rounds.';
    showButtons();
  } else {
    params.roundCount.innerHTML = 'Please, enter a number!';
    params.newGame.classList.toggle('hideButtons');
  }
  params.newGame.classList.toggle('hideButtons');
  params.output.innerHTML = '';
  params.playerScore = 0;
  params.computerScore = 0;
  params.progress = [];
});

for (var i = 0; i < params.selectMove.length; i++) {
  params.selectMove[i].addEventListener('click', function() {
    var kindOfMove = this.getAttribute('data-move');
    playerMove(kindOfMove, params.winner, params.playerScore, params.computerScore, computerMove());
    countingScores();
    gameOver();
  });
};

var computerMove = function() {
  var possibles = ['paper', 'rock', 'scissors'];
  var computerChoice = possibles[Math.floor(Math.random() * possibles.length)];
  return computerChoice;
};

var playerMove = function(kindOfMove, winner, playerScore, computerScore, computerPick) {

  if (kindOfMove === computerPick) {
    params.output.innerHTML = 'It is draw!<br>You chose: ' + kindOfMove + ' and computer chose: ' + computerPick + '<br>';
    params.winner = 'no one';
  } else if (
    (kindOfMove === 'paper' && computerPick === 'rock') ||
    (kindOfMove === 'rock' && computerPick === 'scissors') ||
    (kindOfMove === 'scissors' && computerPick === 'paper')) {
    params.output.innerHTML = 'You won!<br>You chose: ' + kindOfMove + ' and computer chose: ' + computerPick + '<br>';
    params.playerScore++;
    params.winner = 'player';
  } else {
    params.output.innerHTML = ' You lost!<br>You chose: ' + kindOfMove + ' and computer chose: ' + computerPick + '<br>';
    params.computerScore++;
    params.winner = 'computer';
  }
  params.progress.push({
    playerMove: kindOfMove,
    computerMove: computerPick,
    playerScore: params.playerScore,
    computerScore: params.computerScore,
    winner: params.winner,
  });
};

var countingScores = function() {
  params.playerScoreCount.innerHTML = 'Player score: ' + params.playerScore;
  params.computerScoreCount.innerHTML = 'Computer score: ' + params.computerScore;
};

var gameOver = function() {

  if (params.playerScore == params.numbOfRounds || params.computerScore == params.numbOfRounds) {
    if (params.playerScore > params.computerScore) {
      showResult('You won the entire game!');
    } else {
      showResult('You lost the entire game!');
    }
    params.output.innerHTML = '';
    params.playerScoreCount.innerHTML = '';
    params.roundCount.innerHTML = '';
    params.computerScoreCount.innerHTML = '';
    params.newGame.classList.toggle('hideButtons');
    showButtons();
  }
};

var showResult = function(text) {
  var showModals = document.getElementsByClassName('result');

  for (var i = 0; i < showModals.length; i++) {
    showModals[i].classList.add('show');
  }
  var tableResult = document.querySelector('tbody');
  tableResult.innerHTML = '';

  for (var j = 0; j < params.progress.length; j++) {
    tableResult.innerHTML += '<tr><td>' + params.progress[j].playerMove + '</td><td>' + params.progress[j].computerMove + '</td><td>' + params.progress[j].computerScore + '</td><td>' + params.progress[j].playerScore + '</td><td>' + params.progress[j].winner + '</td></tr>';
  }
  document.querySelector('header').innerHTML = text;
};

var hideModal = function(event) {
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');
};

for (var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', hideModal)
}

for (var i = 0; i < modals.length; i++) {
  modals[i].addEventListener('click', function(event) {
    event.stopPropagation();
  });
};