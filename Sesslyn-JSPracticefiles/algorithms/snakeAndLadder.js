const snakeData = [
  [62, 5],
  [33, 6],
  [49, 9],
  [88, 16],
  [41, 20],
  [56, 53],
  [98, 64],
  [93, 73],
  [95, 75],
];

const ladderData = [
  [2, 37],
  [27, 46],
  [10, 32],
  [51, 68],
  [61, 79],
  [65, 84],
  [71, 91],
  [81, 100],
];

const playerData = [
  { player: "Gaurav", moves: [{ diceValue: 0, position: 0 }] },
  { player: "Sagar", moves: [{ diceValue: 0, position: 0 }] },
  { player: "Sesslyn", moves: [{ diceValue: 0, position: 0 }] },
  { player: "Susi", moves: [{ diceValue: 0, position: 0 }] },
];

const snakePositionData = snakeData.map((pair) => {
  return {
    from: pair[0],
    to: pair[1],
  };
});

const ladderPositionData = ladderData.map((pair) => {
  return {
    from: pair[0],
    to: pair[1],
  };
});

let count = 0;
const rollDice = () => {
  return Math.ceil(Math.random() * 6) + 1;
};

const destination = 100;
const numberOfPlayers = playerData.length;

const destinationReachedPlayers = [];

let turnOfPlayer = 0;

while (destinationReachedPlayers.length < numberOfPlayers - 1) {
  if (destinationReachedPlayers.indexOf(turnOfPlayer) != -1) {
    continue;
  }
  let diceValue = rollDice();
  let lastPosition =
    playerData[turnOfPlayer].moves.length > 0
      ? playerData[turnOfPlayer].moves[
          playerData[turnOfPlayer].moves.length - 1
        ].position
      : 0;
  count++;

  let newPosition = lastPosition + diceValue;

  if (newPosition > destination) {
    continue;
  }

  ladderPositionData.forEach((item) => {
    if (newPosition == item.from) {
      newPosition = item.to;
    }
  });

  snakePositionData.forEach((item) => {
    if (newPosition == item.from) {
      newPosition = item.to;
    }
  });

  if (newPosition >= 0) {
    playerData[turnOfPlayer].moves.push({
      diceValue: diceValue,
      position: newPosition,
    });
  } else {
    console.error("Invalid game state: Negative position");
  }

  if (newPosition >= destination) {
    console.log(
      `${playerData[turnOfPlayer].player} has reached the destination!`
    );
    destinationReachedPlayers.push(turnOfPlayer);
  }

  turnOfPlayer = (turnOfPlayer + 1) % numberOfPlayers;
}

if (destinationReachedPlayers.length === numberOfPlayers - 1) {
  console.log("Game Over! Showing ranks...");

  playerData.sort(
    (a, b) =>
      b.moves[b.moves.length - 1].position -
      a.moves[a.moves.length - 1].position
  );

  playerData.forEach((player, index) => {
    console.log(`Rank ${index + 1}: ${player.player}`);
  });

  playerData.forEach((item) => {
    item.moves.forEach((val) => {
      console.log(
        `${item.player} scored ${val.diceValue} and moved to ${val.position}`
      );
    });
  });
} else {
  console.log("Game still in progress...");
}
