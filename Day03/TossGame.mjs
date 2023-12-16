const wonPlayerData = [];

function tossCoin() {
  // Generate a random number (0 or 1)
  const randomNumber = Math.floor(Math.random() * 2);

  // Use the random number to determine the result
  const result = randomNumber === 0 ? "heads" : "tails";

  return result;
}

let playerData = [];
let numberOfPlayers = 2;
let destinationScore = 10;

while (!wonPlayerData.some((player) => player.score >= destinationScore)) {
  let outcome = tossCoin();
  let point = outcome === "heads" ? 1 : 0;

  // Check if the player already has an entry
  let currentPlayerData = playerData.find(
    (data) => data.player === numberOfPlayers
  );

  if (currentPlayerData) {
    // Update the existing entry
    currentPlayerData.score += point;
  } else {
    // Add a new entry for the player
    playerData.push({ player: numberOfPlayers, score: point });
  }

  // Switch to the next player
  numberOfPlayers = (numberOfPlayers % 2) + 1;

  // Determine the winner(s)
  wonPlayerData.length = 0;
  playerData.forEach((data) => {
    if (data.score >= destinationScore) {
      wonPlayerData.push({ player: data.player, score: data.score });
    }
  });
}

console.log("Player data:", playerData);
console.log("Winner(s):", wonPlayerData);
