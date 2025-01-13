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

const playersData = [
  { player: "Player 1", moves: [{ diceValue: 0, position: 0 }] },
  { player: "Player 2", moves: [{ diceValue: 0, position: 0 }] },
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
const numberOfPlayers = playersData.length;

const destinationReachedPlayers = [];

let turnOfPlayer = 0;

while (destinationReachedPlayers.length < numberOfPlayers - 1) {
  if (destinationReachedPlayers.indexOf(turnOfPlayer) != -1) {
    continue;
  }
  let diceValue = rollDice();
  let lastPosition =
    playersData[turnOfPlayer].moves.length > 0
      ? playersData[turnOfPlayer].moves[
          playersData[turnOfPlayer].moves.length - 1
        ].position
      : 0;
  count++;

  let newPosition = lastPosition + diceValue;
  console.log("Before new Position : " + newPosition);

  if (newPosition > destination) {
    continue;
  }
  ladderPositionData.forEach((item) => {
    if (newPosition == item.from) {
      console.log("Ladder");
      newPosition = item.to;
    }
  });

  snakePositionData.forEach((item) => {
    if (newPosition == item.from) {
      console.log("Snake");
      newPosition = item.to;
    }
  });

  console.log("After new Position : " + newPosition);
  if (newPosition >= 0) {
    playersData[turnOfPlayer].moves.push({
      diceValue: diceValue,
      position: newPosition,
    });
  } else {
    console.error("Invalid game state: Negative position");
  }

  if (newPosition >= destination) {
    console.log(
      `${playersData[turnOfPlayer].player} has reached the destination!`
    );
    destinationReachedPlayers.push(turnOfPlayer);
  }

  turnOfPlayer = (turnOfPlayer + 1) % numberOfPlayers;
}

if (destinationReachedPlayers.length === numberOfPlayers - 1) {
  console.log("Game Over! Showing ranks...");

  playersData.sort(
    (a, b) =>
      b.moves[b.moves.length - 1].position -
      a.moves[a.moves.length - 1].position
  );

  playersData.forEach((player, index) => {
    console.log(`Rank ${index + 1}: ${player.player}`);
  });

  playersData.forEach((item) => {
    item.moves.forEach((val) => {
      console.log(
        `${item.player} scored ${val.diceValue} and moved to ${val.position}`
      );
    });
  });
} else {
  console.log("Game still in progress...");
}