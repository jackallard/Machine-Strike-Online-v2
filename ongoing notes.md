Ongoing Online Machine Strike Notes:

What ChatGPT instructed me to do:

Game Design:

Familiarize yourself with the rules and mechanics of the Machine Strike board game from Horizon Forbidden West. Understand how the game is played and the components involved.
Identify the key features and gameplay elements you want to include in the online version.
Technology Stack:

Decide on the technology stack you want to use for your online game. This may include HTML/CSS for the user interface, JavaScript for client-side scripting, and a back-end technology (such as Node.js, Python, or Ruby) for handling game logic and server-side operations.
Research and choose any additional frameworks or libraries that can assist you in developing the game.

User Interface:

Design and implement the user interface for the online game using HTML/CSS. Consider the layout, visual elements, and interactions required to provide a seamless gameplay experience.
Implement the necessary components, such as the game board, player pieces, cards, and any other game-specific elements.

Game Logic:

Implement the game logic using JavaScript or the chosen client-side scripting language. This includes handling player turns, movement, combat, and any other rules and mechanics of the game.
Set up data structures to represent the game state, such as the board, player information, and cards.
Develop the necessary functions and algorithms to process player actions and update the game state accordingly.
Multiplayer Functionality:

If you want to enable multiplayer functionality, you'll need to implement a server-side component using the chosen back-end technology.
Implement a matchmaking system to pair players together for a game session.
Set up communication between the clients and the server, handling data synchronization, turn-based gameplay, and any necessary validations.
Testing and Debugging:

Test the game thoroughly to identify and fix any bugs or issues that may arise.
Iterate on the game design and implementation based on feedback and playtesting.
Deployment:

Once the game is complete, deploy it to a web server or hosting platform to make it accessible to players.
Consider any security measures necessary to protect the game and user data, such as encryption or user authentication.
This is a high-level overview of the steps involved in developing an online version of the Machine Strike board game. Depending on your programming skills and experience, it may require significant effort and learning. Feel free to ask more specific questions along the way, and I'll be glad to assist you further.

What has been done/notes from Github:

# Machine strike

Basically machine strike logic implementation in TS based on the machine strike board game from Horizon Forbidden West.

## Things implemented
- symmetric random board generation
- movement calculation
- movement on board (with esc you end turn)
- rotation (hardcoded only)

## Things not implemented
- gameplay
- rendering stats
- rendering weakpoints
- player interaction
- ...


Notes from me:

1. I need to handle changes between the init of the snake/machine strike game. Changes include the different board size and generation, changing the game state to be in turns, and pretty much implementing everything from matey's typescript

2. Have a separate file with all of the stats of each machine strike piece - DONE!

3. Add two symbols for player 1 and player 2, including whether they've readied up, dc'd etc

4. Add a (live) controls prompt on the side (or bottom!)

5. Have a goal of having the game be progression based, where you can unlock additional pieces as the games go on, either through a level-progression system or through challenges, or both!

6. All bonuses/abilities are going to be programmed later such that a simple function with if statements can be called at the start of each turn/attack, etc

7. Refer to machine.ts for placing and instantiation of machines

8. Following the last article from yesterday, add a prompt where a choice is made when people either create or join a game. This result is fed through the server init functionality



