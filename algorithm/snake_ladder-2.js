//Snake and Lader Pseudo Code Approch

/*

Initialize Players:
 
Create an array players with player names
 - Initialize playerIndex to 0 and positions array with starting positions for each player.

Roll Dice:
 
 - Create a function rollDice that returns a random number between 1 and 6.
 - Handle Snakes and Ladders:
 
Create a function handleSnakesAndLadders :
 - that takes a position as input.
 - Define a mapping of snakes and ladders.
 - Check if the current position has a snake or ladder.
 - Update the player's position accordingly and print the action.

Move Player:
 
 - Create a function movePlayer.
 - Get the current player, current position, and roll the dice.
 - Calculate the new position.
 - Check if the new position is within the valid range (1 to 100).
 - Update the player's position, handle snakes and ladders, and print the move.
 - Check if the player reached position 100 (winning condition).
 - Switch to the next player.

Game Simulation:
 
Simulate the game with a loop:
 - Call movePlayer in each iteration.
 - Exit the loop if a player wins (reaches position 100).
*/


let players = ["Gaurav", "Sagar"];
let playerIndex = 0;
let positions = [0, 0];

function rollDice() {
    return Math.ceil(Math.random() * 6);
}

function handleSnakesAndLadders(position) {
    // Define snakes and ladders mapping
    let snakesAndLadders = {
        16: 6,   // Snake: from 16 to 6
        47: 26,  // Snake: from 47 to 26
        49: 11,  // Snake: from 49 to 11
        56: 53,  // Snake: from 56 to 53
        62: 19,  // Snake: from 62 to 19
        64: 60,  // Snake: from 64 to 60
        24: 87,  // Ladder: from 24 to 87
        73: 93,  // Ladder: from 73 to 93
        95: 75,  // Snake: from 95 to 75
        78: 98   // Ladder: from 78 to 98
    };

    // Check if the current position has a snake or ladder
    if (snakesAndLadders[position]) {
        let newPosition = snakesAndLadders[position];

        // Check if it's a snake or a ladder
        if (newPosition < position) {
            console.log("Oops! " + players[playerIndex] + " encountered a snake at position " + position);
        } else {
            console.log("Yay! " + players[playerIndex] + " climbed a ladder at position " + position);
        }

        console.log(players[playerIndex] + " moved from " + position + " to " + newPosition);
        positions[playerIndex] = newPosition;
    }
}

function movePlayer() {
    let currentPlayer = players[playerIndex];
    let currentPosition = positions[playerIndex];

    let diceValue = rollDice();
    let newPosition = currentPosition + diceValue;

    // Check if the newPosition is within the valid range (1 to 100)
    if (newPosition <= 100) {
        positions[playerIndex] = newPosition;
        handleSnakesAndLadders(newPosition);

        if (positions[playerIndex] === 100) {
            console.log(currentPlayer + " rolled a " + diceValue + " and moved from " + currentPosition + " to " + positions[playerIndex]);
            console.log(currentPlayer + " wins!");
            return true; // Player wins
        } else {
            console.log(currentPlayer + " rolled a " + diceValue + " and moved from " + currentPosition + " to " + positions[playerIndex]);

            playerIndex = (playerIndex + 1) % players.length;
            return false; // Player didn't win yet
        }
    } else {
        // newPosition exceeds 100, don't move the player
        console.log(currentPlayer + " rolled a " + diceValue + " but cannot move beyond 100. Current position: " + currentPosition);
        playerIndex = (playerIndex + 1) % players.length;
        return false; // Player didn't win yet
    }
}

// Simulate the game for 10 turns
while (true && playerIndex >= 0 && playerIndex < players.length) {
    if (movePlayer()) {
        break; // Exit the loop if a player wins
    }
}

