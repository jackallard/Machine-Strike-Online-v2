const gameDisplay = document.getElementById('gameDisplay'); //retrieving the relevant elements from the html
const col = document.body;
const changeColourButton = document.getElementById("changeColourButton");
const newGameButton = document.getElementById("newGameButton");
const joinGameButton = document.getElementById("joinGameButton");
const gameCodeInput = document.getElementById("gameCodeInput");
const roomCodeDisplay = document.getElementById("roomCodeDisplay");
const userNameDisplay = document.getElementById("userNameDisplay");
const nickNameInput = document.getElementById("enterNickname");

let userBoardChoice;

newGameButton.addEventListener("click", createNewGame); //button event listeners
joinGameButton.addEventListener("click", joinNewGame);

function createNewGame() { //create/join new game from event listener
  boardChoice();
}

function boardChoice() {
  document.getElementById("confirm").hidden=false
}

function confirmRandom() {
  randomiseBoard="true";
  document.getElementById("confirm").hidden=true;
  alert("Board will be randomised. Just like the original!");
  socket.emit("createNewRandomGame");
  console.log("emitted to start a random game");
}

function confirmSymmetrical() {
  randomiseBoard="false";
  document.getElementById("confirm").hidden=true;
  alert("Board will be symmetrical. A respectable fairness!")
  socket.emit("createNewSymmetricalGame");
}

function joinNewGame() { //""
  const gameCode = enterGameCode.value;
  console.log(gameCode);
  socket.emit("joinNewGame", String(gameCode));
}

//Setting the basic colours//
const backgroundColour1 = '#00CC33';
const backgroundColour2 = '#808000';
const backgroundColour3 = '#eeee99';
const backgroundColour4 = '#39BFBF';
const backgroundColour5 = '#9F3EE0';
const backgroundColour6 = '#FFFFFF';
const chasmColour = '#644029';
const marshColour = '#239d92';
const grasslandColour = '#a7c35f';
const forestColour = '#5f854f';
const hillColour = '#5b4e45';
const mountainColour = '#b8b0ab';
const tileBorderColour = '#788163';

//changing the background colour//
var colours = [backgroundColour1, backgroundColour2, backgroundColour3,
  backgroundColour4, backgroundColour5, backgroundColour6];
var colourIndex = 0;

changeColourButton.addEventListener("click", () => {

  if (colourIndex >= colours.length) {
    colourIndex = 0;
  }
  col.style.backgroundColor = colours[colourIndex];
  colourIndex++;
});

const socket = io('https://intense-scrubland-55179-e71a97bf4b44.herokuapp.com/'); //using socket.io via heroku

socket.on('initialisation', handleInitialisation);
socket.on("stateGame", handleStateGame);
socket.on("finishGame", handleFinishGame);
socket.on("roomCode", handleRoomCode);
socket.on("unknownRoom", handleUnknownRoom);
socket.on("excessPlayers", handleExcessPlayers);


let gameCanvas; //initialising the client variables which will be used
let ctx;
let playerNum; //playerNum needs to be global
let isGameActive = false;

function keyDown(keyStroke) { //input keypresses to the server
  socket.emit("keyDown", keyStroke.code)
}

// function renderGame(state) { //painting the game state
//   ctx.fillStyle = gridColour;
//   ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

//   const foodPos1 = state.foodPos1;
//   const foodPos2 = state.foodPos2;
//   const abilityPos = state.abilityPos;
//   const gridSize = state.gridSize;
//   const pixelsPerSquare = 800 / gridSize; //pixels to render one square

//   //food #1
//   ctx.fillStyle = foodColour; //rendering the food square
//   ctx.fillRect(foodPos1.x * pixelsPerSquare, foodPos1.y * pixelsPerSquare, pixelsPerSquare, pixelsPerSquare);

//   //food #2
//   ctx.fillStyle = foodColour;
//   ctx.fillRect(foodPos2.x * pixelsPerSquare, foodPos2.y * pixelsPerSquare, pixelsPerSquare, pixelsPerSquare);

//   ctx.fillStyle = abilityColour; //rendering the bonus ability square
//   ctx.fillRect(abilityPos.x * pixelsPerSquare, abilityPos.y * pixelsPerSquare, pixelsPerSquare, pixelsPerSquare);

//   renderSnake(state.players[0], pixelsPerSquare, snakeColour1); //rendering the player position
//   renderSnake(state.players[1], pixelsPerSquare, snakeColour2);
// }

//function renderSnake(snakeState, pixelsPerSquare, snakeColour) { //rendering the player position function
//  const snakeArray = snakeState.snakeArray;
//
//  ctx.fillStyle = snakeColour;
//  for (let cell of snakeArray) { //looping through for each square of the snake
//    ctx.fillRect(cell.x * pixelsPerSquare, cell.y * pixelsPerSquare, pixelsPerSquare, pixelsPerSquare);
//  }
//}

function handleInitialisation(number, roomName, gameState) {
  if (gameState === undefined) {
    console.log("gamestate is undefined");
  }
  else {
  userNameDisplay.innerText = String(enterNickname.value);
  console.log("Handle initialisation received");
  playerNum = number;

  isGameActive = true;
  mainDisplay.style.display = "none";
  gameDisplay.style.display = "block";
  //kept as a comment as added for (unsuccessful!) testing purposes
  //document.getElementById("gameDisplay").hidden=false; 
  //document.getElementById("gameCanvas").hidden=false;

  document.addEventListener("keydown", keyDown);

  canvas = document.getElementById('gameCanvas'); //using the ID to link to the html
  ctx = canvas.getContext('2d');

  drawBoard(canvas, ctx, gameState);
  }
}

//setting up the canvas and drawing the game board

function drawBoard(canvas, ctx, gameState) {
  //clear canvas
  //2d for loop

  number_To_Image = {
    '-2': 'resources/chasm_tile.png',
    '-1': 'resources/marsh_tile.png',
    '0': 'resources/grassland_tiles.png',
    '1': 'resources/forest_tile.png',
    '2': 'resources/hill_tile.png',
    '3': 'resources/mountain_tile.png'
  }

  board = gameState.gameBoard;
  w = canvas.width;
  h = canvas.height;
  tile_w = w/8;
  tile_h = h/8;
  ctx.clearRect(0,0,w,h);
  for (let x=0; x<8; x++) {
    for (let y=0; y<8; y++) {
      const myImage = new Image();
      myImage.addEventListener("load",
      () => {
      console.log("image cell loaded of type");
      },
      false,
    );
    myImage.src = number_To_Image[numStr.toString()];
    console.log("cell assigned to:" + myImage.src);
    ctx.drawImage(terrain_Image, x*tile_w, y*tile_h, tile_w, tile_h);
    }
  }
  //draw the grid lines if wanted
  //maybe include board pieces within this function (bcos I initially had rendergame).. some merging might be required!

}

function getTerrainImageFromBoardNumber(numStr) {
  number_To_Image = {
    '-2': './resources/chasm_tile.png',
    '-1': './resources/marsh_tile.png',
    '0': './resources/grassland_tiles.png',
    '1': 'resources/forest_tile.png',
    '2': 'resources/hill_tile.png',
    '3': 'resources/mountain_tile.png'
  }

  const myImage = new Image();
  myImage.addEventListener(
    "load",
    () => {
      console.log("image cell loaded of type");
    },
    false,
  );
  myImage.src = number_To_Image[numStr.toString()];
  console.log("cell assigned to:" + myImage.src);
  return myImage;
}

function handleStateGame(gameState) { //when it receives a new game state
  if (!isGameActive) {
    return;
  }
  gameState = JSON.parse(gameState);
  console.log("GS" + gameState);
  requestAnimationFrame(() => renderGame(gameState)); //the paint game function will be called
}

function handleFinishGame(value, isGameOver, state, roomName) { //when a game is over
  value = JSON.parse(value);
  console.log("Game finished - player has reached score limit");
  if (value.isGameOver == playerNum) {
    alert("Player " + playerNum + " has reached the score limit. GGWP!");
    // saveToFile(playerNum, nickNameInput, gameCodeInput, state);
  } else {
      if (playerNum == 1) {
        alert("Player 2 has reached the score limit. Better luck next time!");
      }
      else {
        alert("Player 1 has reached the score limit. Better luck next time!");
      }
    }
}

function handleRoomCode(roomCode) { //receive and display the room code
  alert("Game code is: " + roomCode + ". Press OK to join this room.");
  roomCodeDisplay.innerText = roomCode;
}

function handleUnknownRoom() { //receive and display the "unknown room" error message
  playerNum = null;
  enterGameCode.value = "";
  roomCodeDisplay.innerText = "";
  mainDisplay.style.display = "block";
  gameDisplay.style.display = "none";
  alert("Room not found. Please check the code and try again.");
}

function handleExcessPlayers() { //receive and display the "too many players" error message
  playerNum = null;
  enterGameCode.value = "";
  roomCodeDisplay.innerText = "";
  mainDisplay.style.display = "block";
  gameDisplay.style.display = "none";
  alert("Room full. Please try again later.");
}

// function saveToFile(playerNum, nicknameInput, gameCodeInput, state, roomName) {
//   matchTime = String(state.time);
//   console.log(matchTime);
//   const content = (playerNum + ", " + nickNameInput + ", 30, " + matchTime +
//   ", " + roomName + ", " + 2);
//   console.log(content);
//   content = String(content);
//   console.log(content);
//
//   fs.appendFile('/Users/jacka/OneDrive/Documents/NEA/highScores.txt', content, err => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     //done!
//   });
// }
// const nameField = document.querySelector("input");
//
// nameField.addEventListener("input", () => {
//   nameField.setCustomValidity("");
//   nameField.checkValidity();
//   console.log(nameField.checkValidity());
// });
//
// nameField.addEventListener("invalid", () => {
//   nameField.setCustomValidity("Please enter a nickname.");
// });

// function validate() {
//   if (gameCodeInput == "" || nickNameInput == "") {
//     alert("Please enter a valid nickname and roomcode.");
//     return false;
//   }
// }
//
// document