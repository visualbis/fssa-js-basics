const wonPlayerData = [];
const roundData = [];

function tossCoin() {
  const randomNumber = Math.floor(Math.random() * 2);
  const result = randomNumber === 0 ? "heads" : "tails";

  return result;
}

let playerData = [];
let numberOfPlayers = 2;
let destinationScore = 10;
let round = 1;

while (!wonPlayerData.some((player) => player.score >= destinationScore)) {
  let outcome = tossCoin();
  let point = outcome === "heads" ? 1 : 0;

  // Check if the player already has an entry
  let currentPlayerData = playerData.find(
    (data) => data.player === numberOfPlayers
  );

  if (currentPlayerData) {
    currentPlayerData.score += point;
  } else {
    playerData.push({ player: numberOfPlayers, score: point });
  }

  // Store round data
  let roundPlayerData = roundData.find((data) => data.round === round);
  if (roundPlayerData) {
    roundPlayerData["player" + numberOfPlayers] = currentPlayerData
      ? currentPlayerData.score
      : point;
  } else {
    let newRoundData = { round: round };
    newRoundData["player" + numberOfPlayers] = currentPlayerData
      ? currentPlayerData.score
      : point;
    roundData.push(newRoundData);
  }

  // Switch to the next player
  numberOfPlayers = (numberOfPlayers % 2) + 1;

  // Check if a new round has started
  if (numberOfPlayers === 1) {
    round++;
  }

  // Determine the winner(s)
  wonPlayerData.length = 0;
  playerData.forEach((data) => {
    if (data.score >= destinationScore) {
      wonPlayerData.push({ player: data.player, score: data.score });
    }
  });
}

console.log("Round data:", roundData);
console.log("Winner(s):", wonPlayerData);
