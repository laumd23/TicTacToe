  // Función para obtener las casillas del juego
  function getTiles() {
    return document.getElementsByClassName('tile');
  }
  
  // Función para obtener los jugadores del juego
  function getPlayers() {
    return document.getElementsByClassName('player');
  }

  // Función para obtener el jugador activo
  function getActivePlayer() {
    return currentPlayer === 1 ? players[0] : players[1];
  }
  
  // Variables para llevar el seguimiento del estado del juego
  let currentPlayer = 1;
  let gameActive = true;
  let gameState = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  const winningConditions = [
    [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], // Filas
    [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], // Columnas
    [0, 5, 10, 15], [3, 6, 9, 12] // Diagonales
  ];
  
  // Elementos del DOM
  const statusDisplay = document.getElementById('status');
  const restartButton = document.getElementById('restart-btn');
  const tiles = getTiles();
  const players = getPlayers();
  
  // Función para reiniciar el juego
  function restartGame() {
    currentPlayer = 1;
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = "Turn Player 1";
    const playerElements = getPlayers();

    Array.from(tiles).forEach(tile => {
      tile.textContent = '';
    });
    Array.from(playerElements).forEach((player) => {
      console.log(player)
      player.classList.remove('active');
    })
  }
  
  // Función para verificar si se cumplen las condiciones de victoria
  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c, d] = winningConditions[i];
      const val1 = gameState[a];
      const val2 = gameState[b];
      const val3 = gameState[c];
      const val4 = gameState[d];
      if (val1 !== '' && val1 === val2 && val1 === val3 && val1 === val4) {
        roundWon = true;
        break;
      }
    }
  
    if (roundWon) {
      gameActive = false;
      const activePlayer = getActivePlayer();
      statusDisplay.textContent = `${activePlayer.textContent} won!`;
      return;
    }
  
    // Verificar si hay empate
    if (!gameState.includes('')) {
      gameActive = false;
      statusDisplay.textContent = '¡Empate!';
      return;
    }
  
    // Cambiar el jugador actual
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    const activePlayer = getActivePlayer();
    statusDisplay.textContent = `Turn ${activePlayer.textContent}`;
  }

  function backgroundActivePlayer(){
    const activePlayer = getActivePlayer()
    const activePlayerValue = activePlayer.textContent;
    const playerElements = getPlayers();

    Array.from(playerElements).forEach((player) => {
      console.log(player)
      player.classList.remove('active');
      if (player.textContent === activePlayerValue) {
        player.classList.add('active');
      }
    });
  }

 // Función para manejar el clic en una casilla
  function handleTileClick(tile) {
    const tileIndex = parseInt(tile.classList[1]) - 1;
  
    // Verificar si la casilla ya está ocupada o el juego está inactivo
    if (gameState[tileIndex] !== '' || !gameActive) {
      return;
    }
  
    // Actualizar el estado del juego y el contenido de la casilla
    gameState[tileIndex] = currentPlayer === 1 ? 'X' : 'O';
    tile.textContent = gameState[tileIndex];
    
    backgroundActivePlayer()
    // Verificar el resultado del juego
    handleResultValidation();
  }
  
  // Agregar event listeners a las casillas
  Array.from(tiles).forEach(tile => {
    tile.addEventListener('click', function() {
      handleTileClick(this);
    });
  });
  
  // Agregar event listener al botón de reinicio
  restartButton.addEventListener('click', restartGame);
  
  // Iniciar el juego
  restartGame();