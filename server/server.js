const msg = "debug";
const io = require("socket.io")({ //establishing socket.io, server object
  cors: {
    origin: process.env.PORT, //establishing
  }
});
const fs = require('fs');


//importing from other files
const { move_Delay } = require("./constants");
const { createStateGame } = require("./gamelogic");
const { loopGame } = require("./gamelogic");

const stateGame = {};
const roomLookup = {};


io.on("connection", client => { //establishing the client object

  client.on("keyDown", handleKeyDown);
  //   const speed = getUpdatedSpeed(stateGame[roomLookup[client.id]], keyCode, client, number);
  //   if (speed) {
  //     stateGame[roomName].players[client.number-1].speed = speed;
  //   }
  // }); //listening for inputs

  function handleKeyDown(keyCode) {
    console.log(keyCode);
    const roomName = roomLookup[client.id]; //grabbing the room which we need to update the state for

    if (!roomName) {
      return; //typing whilst on the menu/not in a room
    }

    keyCode = (keyCode);
    //this is where I need to put the inputs
    //const speed = getUpdatedSpeed(stateGame[roomName], keyCode, client);
    //console.log(speed);
    //if (speed) { //if the speed exists
      //stateGame[roomName].players[client.number-1].speed = speed;
      //applying the speed to the correct room && player
     //}
  }

  client.on("createNewRandomGame", handleCreateNewRandomGame);
  client.on("createNewSymmetricalGame", handleCreateNewSymmetricalGame);
  client.on("joinNewGame", handleJoinNewGame);

  function makeid(length) {
    var result = "";
    var numbers = "0123456789";
    var numLength = numbers.length;
    for (var i = 0; i < length; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numLength));
    }
    return result;
  }

  function handleCreateNewRandomGame() {
    console.log("trying to create new random game");
    let roomName = makeid(2); //roomName is a random 2-digit number
    roomLookup[client.id] = roomName;
    client.emit("roomCode", roomName);

    console.log("created", roomName);
    console.log("---");
    stateGame[roomName] = createStateGame("random");
    console.log(stateGame);
    stateGame[roomName].players.push({  //adds the new player onto the array of all players
      //the player object stores the data for each player, such as its machines and their relevant positions
      playerScore: 0, //number of victory points
      playerMachines: {},
          });

    client.join(roomName);
    client.number = 1;
    client.emit("initialisation", 1, roomName, JSON.stringify(stateGame));
    console.log("emitted to client to start init");
  }

  function handleCreateNewSymmetricalGame() {
    let roomName = makeid(2); //roomName is a random 2-digit number
    roomLookup[client.id] = roomName;
    client.emit("roomCode", roomName);

    console.log("created", roomName);
    console.log("---");
    stateGame[roomName] = createStateGame("symmetrical");
    console.log(stateGame);
    stateGame[roomName].players.push({  //adds the new player onto the array of all players
      //the player object stores the data for each player, such as its machines and their relevant positions
      playerScore: 0, //number of victory points
      playerMachines: {},
          });

    client.join(roomName);
    client.number = 1;
    client.emit("initialisation", 1, roomName, JSON.stringify(stateGame));
  }

  function handleJoinNewGame(roomName) {
    console.log("joined", roomName);
    console.log("----");
    console.log(stateGame);
    console.log(roomName);
    const room = stateGame[roomName];
    console.log(room);

    let allUsers;
    let numClients = 0;

    if (room) {
      numClients = room.players.length; //object of all current users in room
      //key: Client id, object: client
    }

    if (numClients == 0) { //unknown room - no room to be joined
      client.emit("unknownRoom");
      return;
    } else if (numClients > 1) { //if already enough players to start a game
      client.emit("excessPlayers");
      return;
    }
    //now that we know the room exists and it's not full..
    roomLookup[client.id] = roomName; //the client can be added to the client room map
                                     //and assigns the room name to the client

    stateGame[roomName].players.push({   //the player object stores the data for each snake, such as its position
      playerScore: 0, //number of victory points
      playerMachines: {},
      
    })
    client.join(roomName);
    client.number = 2;
    //io.sockets.in(roomName).emit("board", JSON.stringify(state));
    client.emit("initialisation", 2, roomName, stateGame);
    console.log(room);

    //startGameInterval(stateGame, roomName); //the game can now be started as both players are now in the room
                        //only the roomName

    //all of these steps are similar to the creatxion of the room, however when joining
    //there are additional validations to be done.
  }
});

//function startGameInterval(stateGame, roomName) {
//  const loopId = setInterval(() => {
//    const isGameOver = loopGame(stateGame[roomName]); //checking the game is still ongoing
//
//    if (!isGameOver) {
//      emitStateGame(roomName, stateGame[roomName]);
//    } else {
//      emitFinishGame(roomName, isGameOver, stateGame[roomName], roomName);
//       //clear the room state when a game is over
//      clearInterval(loopId);
//
//    }
//  }, move_Delay); //time between each refreshed frame
// }

function emitStateGame(roomName, state) {
  io.sockets.in(roomName) //emit to all clients in the  room
  .emit("stateGame", JSON.stringify(state)); //the current state of the game
}

function emitFinishGame(roomName, isGameOver, state, roomName) {
  io.sockets.in(roomName) //emit to all clients in the room
  .emit("finishGame", JSON.stringify({ isGameOver })); //that the game has finished
  saveToFile(client.number, roomName, state);
}

function saveToFile(playerNum, roomName, state) {
  matchTime = String(state.time);
  console.log(matchTime);
  const content = (playerNum + ", 30, " + matchTime +
  ", " + roomName + ", " + stateGame[roomName].players.length);
  console.log(content);
  content = String(content);
  console.log(content);

  fs.appendFile('/Users/jacka/OneDrive/Documents/NEA/highScores.txt', content, err => {
    if (err) {
      console.log(err);
      return;
    }
    //done!
  });
}

io.listen(process.env.PORT); //using heroku's dynamic ports 
