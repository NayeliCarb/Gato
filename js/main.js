var cuadro, game;
var message = document.getElementsByClassName('mensaje')[0]
var cuadroTablero = document.getElementsByClassName('cuadroFila');


function autoMove(x, y) { // pasar turno de X
  if (game.currentMover === null) {
    game.currentMover = 'X';
    xMoves(x, y);
    return;
  }

  switch (game.currentMover) { 
    case 'X':
      oMoves(x, y);
      break;
    case 'O':
      xMoves(x, y);
      break;
  }
}

function oMoves(x, y) {
  game.currentMover = 'O';
  makeMove(x, y, 'O');
  return;
}

function xMoves(x, y) { 
  game.currentMover = 'X';
  makeMove(x, y, 'X');
  return;
}

function beforeMove() {
  if (game.gameComplete === true) {
    alert('Please reset the game');
    throw ('reset board');
  }
  game.message = null;
}

function afterMove() {
  checkForWinner();
  if (game.message !== null) {
    showmessage(game.message);
    return;
  }
}

function makeMove(x, y, val) {
  beforeMove();

  if (cuadro[y - 1][x - 1] === null) {
    cuadro[y - 1][x - 1] = val;
  } else {
    game.message = 'this space is already taken';
  }

  afterMove();
  return;
}

function checkForWinner() { //comparacion de casillas para saber el ganador del juego 

  for (var i = 0, l = cuadro.length; i < l; i++) {
    
    if (cuadro[i][0] !== null && cuadro[i][0] === cuadro[i][1] && cuadro[i][1] === cuadro[i][2]) {
      ganador(game.currentMover);
      return;
    }

    
    if (cuadro[0][i] !== null && cuadro[0][i] === cuadro[1][i] && cuadro[1][i] === cuadro[2][i]) {
      ganador(game.currentMover);
      return;
    }

    
    if (cuadro[0][0] !== null && cuadro[0][0] === cuadro[1][1] && cuadro[1][1] === cuadro[2][2]) {
      ganador(game.currentMover);
      return;
    }

    
    if (cuadro[2][0] !== null && cuadro[2][0] === cuadro[1][1] && cuadro[1][1] === cuadro[0][2]) {
      ganador(game.currentMover);
      return;
    }
  }
}


function limpiarTablero() {

  cuadro = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  message.innerHTML = '';
  for (var i = 0, l = cuadroTablero.length; i < l; i++) {
    cuadroTablero[i].innerHTML = '';
    cuadroTablero[i].classList.remove('selected-space');
  }

  game = {
    nextMover: null,
    currentMover: null,
    message: null,
    gameComplete: false
  };
}

limpiarTablero();


function ganador(player) {
  game.gameComplete = true;
  game.message = "";
  game.message += player + ' Gano! ';
  game.message += "<span>Volver a jugar</span>";
  return;
}

function showmessage(msg) {
  message.innerHTML = msg;
}


for (var i = 0, l = cuadroTablero.length; i < l; i++) {
  cuadroTablero[i].addEventListener('click', function(e) {
    var coords = e.target.dataset['space'].split(',');
    autoMove(coords[0], coords[1]);
    e.target.innerHTML = game.currentMover;
    e.target.classList.add('selected-space');
  });
}

message.addEventListener('click', function() {
 limpiarTablero();
});