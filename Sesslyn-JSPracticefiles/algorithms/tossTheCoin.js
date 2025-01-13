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

  let currentPlayerData = playerData.find(
    (data) => data.player === numberOfPlayers
  );

  if (currentPlayerData) {
    currentPlayerData.score += point;
  } else {
    playerData.push({ player: numberOfPlayers, score: point });
  }

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

  numberOfPlayers = (numberOfPlayers % 2) + 1;

  if (numberOfPlayers === 1) {
    round++;
  }

  wonPlayerData.length = 0;
  playerData.forEach((data) => {
    if (data.score >= destinationScore) {
      wonPlayerData.push({ player: data.player, score: data.score });
    }
  });
}
console.log(playerData);
console.log("Round data:", roundData);
console.log("Winner(s):", wonPlayerData);