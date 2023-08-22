const { grid_Size, jump_Amount } = require("./constants"); //retrieving constants

module.exports = {
  createStateGame: createStateGame,
  loopGame: loopGame,
  getUpdatedSpeed: getUpdatedSpeed,
  generateBoard: generateBoard,
}

function getRandomInt(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function generateBoard(if_Randomise) {
  console.log("starting board randomisation");
  var board=[
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  if (if_Randomise === "random") {
    for (i=0; i<board.length;i++){
      for (j=0; j<board.length;j++){
        board[i][j] = getRandomInt(-2,4);
      }
    }
  }
else {
  for (i=0;i<8;i++){
    for (j=0;j<4;j++){
      board[i][j] = getRandomInt(-2,4);
    }
  }
  for (i=0;i<8;i++){
    for (j=0;j<4;j++){
      board[7-i][7-j] = board[i][j]
    }
  }
  }
  console.log(board);
  return board;
}

function createStateGame(if_Randomise) {
  return {   //establishing the game state - includes the definitions of the key variables
    players: [],   //the player object stores the data for each player, such as the status of machine pieces, number of victory points etc
    gridSize: 8,
    time: 0,
    turns: 0,
    isPlayerOneTurn: false,
    isPlayerTwoTurn: false,
    active: true,
    gameBoard: generateBoard(if_Randomise),
  };
}

//this all needs to be changed at a later date to a turn system
function loopGame(stateGame) {
  if (!stateGame) { //checking that the game exists and is running
    return; //do not increment the time - the game is no longer in play
  }

  //game logic for both players//
  const player1 = stateGame.players[0]; //retrieving from the player state object
  const player2 = stateGame.players[1];

  //p1
  if (player1.speed.x != 1 && player1.speed.x != -1 && player1.speed.x != 0 &&
    player1.speed.y != 1 && player1.speed.y != -1 && player1.speed.y != 0) {
    player1.playerPos.x
  }

  //p2
  if (player2.speed.x != 1 && player2.speed.x != -1 && player2.speed.x != 0 &&
    player2.speed.y != 1 && player2.speed.y != -1 && player2.speed.y != 0) {
      console.log("p2-2");
    player2.playerPos.x
  }

  //p1
  player1.playerPos.x += player1.speed.x; //updating the position for each snake
  player1.playerPos.y += player1.speed.y; //based on its direction

  //p2
  player2.playerPos.x += player2.speed.x;
  player2.playerPos.y += player2.speed.y;

  //p1
  if (player1.playerPos.x < 0) { //VALIDATION
    player1.playerPos.x = grid_Size-1;  //wraparound for if its new position is off the grid
  }
  if (player1.playerPos.x > grid_Size-1) {
    player1.playerPos.x = 0;
  }
  if (player1.playerPos.y < 0) {
    player1.playerPos.y = grid_Size-1;
  }
  if (player1.playerPos.y > grid_Size-1) {
    player1.playerPos.y = 0;
  }

  //p2
  if (player2.playerPos.x < 0) { //VALIDATION
    player2.playerPos.x = grid_Size-1;  //wraparound for if its new position is off the grid
  }
  if (player2.playerPos.x > grid_Size-1) {
    player2.playerPos.x = 0;
  }
  if (player2.playerPos.y < 0) {
    player2.playerPos.y = grid_Size-1;
  }
  if (player2.playerPos.y > grid_Size-1) {
    player2.playerPos.y = 0;
  }

  //p1 - food #1
  if (stateGame.foodPos1.x === player1.playerPos.x
    && stateGame.foodPos1.y === player1.playerPos.y) {
      player1.snakeArray.push({ ...player1.playerPos }); //makes the snake one longer
      player1.playerScore += 1; //increase the score //updates the position
      player1.playerPos.x += player1.speed.x; //moves the snake forward so
      player1.playerPos.y += player1.speed.y; //it does not collide with itself
      generateFood1(stateGame); //places a new food space if one has just been eaten
  }

  //p1 - food #2
  if (stateGame.foodPos2.x === player1.playerPos.x
    && stateGame.foodPos2.y === player1.playerPos.y) {
      player1.snakeArray.push({ ...player1.playerPos }); //makes the snake one longer
      player1.playerScore += 1; //increase the score //updates the position
      player1.playerPos.x += player1.speed.x; //moves the snake forward so
      player1.playerPos.y += player1.speed.y; //it does not collide with itself
      generateFood2(stateGame); //places a new food space if one has just been eaten
  }

  //p2 - food #1
  if (stateGame.foodPos1.x === player2.playerPos.x
    && stateGame.foodPos1.y === player2.playerPos.y) {
      player2.snakeArray.push({ ...player2.playerPos }); //makes the snake one longer
      player2.playerScore += 1; //increase the score //updates the position
      player2.playerPos.x += player2.speed.x; //moves the snake forward so
      player2.playerPos.y += player2.speed.y; //it does not collide with itself
      generateFood1(stateGame); //places a new food space if one has just been eaten
  }

  //p2 - food #2
  if (stateGame.foodPos2.x === player2.playerPos.x
    && stateGame.foodPos2.y === player2.playerPos.y) {
      player2.snakeArray.push({ ...player2.playerPos }); //makes the snake one longer
      player2.playerScore += 1; //increase the score //updates the position
      player2.playerPos.x += player2.speed.x; //moves the snake forward so
      player2.playerPos.y += player2.speed.y; //it does not collide with itself
      generateFood2(stateGame); //places a new food space if one has just been eaten
  }

  //p1
  if (stateGame.abilityPos.x === player1.playerPos.x //if snake goes on ability
    && stateGame.abilityPos.y === player1.playerPos.y && player1.hasBonusAbility === false) {
      player1.hasBonusAbility = true;
      generateAbility(stateGame); //places a new ability space
  }

  //p2
  if (stateGame.abilityPos.x === player2.playerPos.x //if snake goes on ability
    && stateGame.abilityPos.y === player2.playerPos.y && player2.hasBonusAbility === false) {
      player2.hasBonusAbility = true;
      generateAbility(stateGame); //places a new ability space
  }

  //p1
  if (player1.speed.x || player1.speed.y) { //checking that the snake is moving
    for (let cell of player1.snakeArray) {
      if (cell.x == player1.playerPos.x && cell.y == player1.playerPos.y) {
        player1.playerScore = 0;
        respawnSnake1(stateGame); //respawns the snake if it hits itself
      }
    }

      player1.snakeArray.push({ ...player1.playerPos }); //snake moving forward
      player1.snakeArray.shift();
    }

    //p2
    if (player2.speed.x || player2.speed.y) { //checking that the snake is moving
      for (let cell of player2.snakeArray) {
        if (cell.x == player2.playerPos.x && cell.y == player2.playerPos.y) {
          player2.playerScore = 0;
          respawnSnake2(stateGame); //respawns the snake if it hits itself
        }
      }

        player2.snakeArray.push({ ...player2.playerPos }); //snake moving forward
        player2.snakeArray.shift();
      }

    if (player1.speed.x || player1.speed.y) {
      for (let cell of player2.snakeArray) {
        if (cell.x == player1.playerPos.x && cell.y == player1.playerPos.y) {
          player1.playerScore = 0;
          respawnSnake1(stateGame);
        }
      }

      player1.snakeArray.push({ ...player1.playerPos });
      player1.snakeArray.shift();
    }

    if (player2.speed.x || player2.speed.y) {
      for (let cell of player1.snakeArray) {
        if (cell.x == player2.playerPos.x && cell.y == player2.playerPos.y) {
          player2.playerScore = 0;
          respawnSnake2(stateGame);
        }
      }

      player2.snakeArray.push({ ...player2.playerPos });
      player2.snakeArray.shift();
    }

    if (player1.playerScore == 5) { //if player1 has reached the win condition
      stateGame.time += 1;
      return 1; //return player1 won
    }
    else if (player2.playerScore == 5) {
      stateGame.time += 1;
      return 2;
    }

    stateGame.time += 1;
    return false; //if game is still in play
    //time is added no matter the outcome - this is so it can be used for the leaderboard
}

//generatefood #1
function generateFood1(stateGame) {
  stateGame.foodPos1  = {
    x: Math.floor(Math.random() * 20), //create a random number between 1 and 20
    y: Math.floor(Math.random() * 20), //for both x and y co-ords
  }
  for (let cell of stateGame.players[0].snakeArray) { //check if space is full - VALIDATION
    if (cell.x === stateGame.foodPos1.x && cell.y === stateGame.foodPos1.y) {
      return generateFood1(stateGame); //recursively call until food isn't on snake
    }
  }
  for (let cell of stateGame.players[1].snakeArray) { //check if space is full - VALIDATION
    if (cell.x === stateGame.foodPos1.x && cell.y === stateGame.foodPos1.y) {
      return generateFood1(stateGame); //recursively call until food isn't on snake
    }
  }
}

//generatefood #2
function generateFood2(stateGame) {
  stateGame.foodPos2  = {
    x: Math.floor(Math.random() * 20), //create a random number between 1 and 20
    y: Math.floor(Math.random() * 20), //for both x and y co-ords
  }
  for (let cell of stateGame.players[0].snakeArray) { //check if space is full - VALIDATION
    if (cell.x === stateGame.foodPos2.x && cell.y === stateGame.foodPos2.y) {
      return generateFood2(stateGame); //recursively call until food isn't on snake
    }
  }
  for (let cell of stateGame.players[1].snakeArray) { //check if space is full - VALIDATION
    if (cell.x === stateGame.foodPos2.x && cell.y === stateGame.foodPos2.y) {
      return generateFood2(stateGame); //recursively call until food isn't on snake
    }
  }
}

function generateAbility(stateGame) { //same as generateFood
  stateGame.abilityPos = {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20),
  }
  for (let cell of stateGame.players[0].snakeArray) { //VALIDATION - p1
    if (cell.x === stateGame.abilityPos.x && cell.y === stateGame.abilityPos.y) {
      return generateAbility(stateGame);
    }
  }
  for (let cell of stateGame.players[1].snakeArray) { //VALIDATION - p2
    if (cell.x === stateGame.abilityPos.x && cell.y === stateGame.abilityPos.y) {
      return generateAbility(stateGame);
    }
  }
}

//respawn first snake
function respawnSnake1(stateGame) { //similar to generateFood/Ability
  stateGame.players[0].playerPos = {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20),
  }
  stateGame.players[0].snakeArray = [
    {x: stateGame.players[0].playerPos.x, y: stateGame.players[0].playerPos.y},
    {x: stateGame.players[0].playerPos.x-1, y: stateGame.players[0].playerPos.y},
  ]
  stateGame.players[0].speed = {x: 0, y: 0};
  stateGame.players[0].hasBonusAbility = false;

  for (let cell of stateGame.players[0].snakeArray) { //VALIDATION -
    if (cell.x === stateGame.abilityPos.x && cell.y === stateGame.abilityPos.y //if snake respawns on any other taken space
      || cell.x === stateGame.foodPos1.x && cell.y === stateGame.foodPos1.y
      || cell.x === stateGame.foodPos2.x && cell.y === stateGame.foodPos2.y) {
        return respawnSnake1(stateGame);
      }
  }
}

//respawn second snake
function respawnSnake2(stateGame) { //similar to generateFood/Ability
  stateGame.players[1].playerPos = {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20),
  }
  stateGame.players[1].snakeArray = [
    {x: stateGame.players[1].playerPos.x, y: stateGame.players[1].playerPos.y},
    {x: stateGame.players[1].playerPos.x-1, y: stateGame.players[1].playerPos.y},
  ]
  stateGame.players[1].speed = {x: 0, y: 0};
  stateGame.players[1].hasBonusAbility = false;

  for (let cell of stateGame.players[1].snakeArray) { //VALIDATION -
    if (cell.x === stateGame.abilityPos.x && cell.y === stateGame.abilityPos.y //if snake respawns on any other taken space
      || cell.x === stateGame.foodPos1.x && cell.y === stateGame.foodPos1.y
      || cell.x === stateGame.foodPos2.x && cell.y === stateGame.foodPos2.y) {
        return respawnSnake2(stateGame);
      }
  }
}

function getUpdatedSpeed(stateGame, keyCode, client) { //getting a new value for the speed player
  //state variable based on the keypress that was made
  console.log("work", stateGame, client.number);
  if (keyCode == "KeyW" && stateGame.players[client.number-1].speed.y != 1) { //W - up
    console.log(1);
    return { x: 0, y: -1};
  }
  else if (keyCode == "KeyA" && stateGame.players[client.number-1].speed.x != 1) { //A - left
    console.log(2);
    return { x: -1, y: 0};
  }
  else if (keyCode == "KeyS" && stateGame.players[client.number-1].speed.y != -1) { //S - down
    console.log(3);
    return { x: 0, y: 1 };
  }
  else if (keyCode == "KeyD" && stateGame.players[client.number-1].speed.x != -1) { //D - right
    console.log(4);
    return { x: 1, y: 0 };
  }
  else if (keyCode == "Space" && stateGame.players[client.number-1].hasBonusAbility === true) { //Space - activate ability
    stateGame.players[client.number-1].hasBonusAbility = false;
    for (let i = 0; i < jump_Amount; i++) {
      stateGame.players[client.number-1].playerPos.x += stateGame.players[client.number-1].speed.x;
      stateGame.players[client.number-1].playerPos.y += stateGame.players[client.number-1].speed.y;
      stateGame.players[client.number-1].snakeArray.push({ ...stateGame.players[client.number-1].playerPos }); //snake moving forward
      stateGame.players[client.number-1].snakeArray.shift();
    }
    console.log("Jump successful");
    return;
  }
}
