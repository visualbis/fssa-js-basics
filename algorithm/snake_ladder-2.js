const snakes = [
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
  
  const ladders = [
    [2, 37],
    [27, 46],
    [10, 32],
    [51, 68],
    [61, 79],
    [65, 84],
    [71, 91],
    [81, 100],
  ];
  
  const players = [
    { name: "Gaurav", moves: [{ diceValue: 0, position: 0 }] },
    { name: "Sagar", moves: [{ diceValue: 0, position: 0 }] },
    // { name: "Susi", moves: [{ diceValue: 0, position: 0 }] },
  ];
  
  const snakePositions = snakes.map((pair) => ({
    from: pair[0],
    to: pair[1],
  }));
  
  const ladderPositions = ladders.map((pair) => ({
    from: pair[0],
    to: pair[1],
  }));
  
  let moveCount = 0;
  
  const rollDice = () => Math.ceil(Math.random() * 6) + 1;
  
  const targetPosition = 100;
  const numberOfPlayers = players.length;
  
  const reachedPlayers = [];
  
  let currentPlayerIndex = 0;
  
  while (reachedPlayers.length < numberOfPlayers - 1) {
    if (reachedPlayers.includes(currentPlayerIndex)) {
      continue;
    }
  
    const diceValue = rollDice();
    const lastPosition =
      players[currentPlayerIndex].moves.length > 0
        ? players[currentPlayerIndex].moves[
            players[currentPlayerIndex].moves.length - 1
          ].position
        : 0;
    moveCount++;
  
    let newPosition = lastPosition + diceValue;
  
    if (newPosition > targetPosition) {
      continue;
    }
  
    ladderPositions.forEach((item) => {
      if (newPosition === item.from) {
        console.log("Ladder");
        newPosition = item.to;
      }
    });
  
    snakePositions.forEach((item) => {
      if (newPosition === item.from) {
        console.log("Snake");
        newPosition = item.to;
      }
    });
  
    console.log("After new Position: " + newPosition);
  
    if (newPosition >= 0) {
      players[currentPlayerIndex].moves.push({
        diceValue,
        position: newPosition,
      });
    } else {
      console.error("Invalid game state: Negative position");
    }
  
    if (newPosition >= targetPosition) {
      console.log(`${players[currentPlayerIndex].name} has reached the destination!`);
      reachedPlayers.push(currentPlayerIndex);
    }
  
    currentPlayerIndex = (currentPlayerIndex + 1) % numberOfPlayers;
  }
  
  if (reachedPlayers.length === numberOfPlayers - 1) {
    console.log("Game Over! Showing ranks...");
  
    players.sort(
      (a, b) =>
        b.moves[b.moves.length - 1].position - a.moves[a.moves.length - 1].position
    );
  
    players.forEach((player, index) => {
      console.log(`Rank ${index + 1}: ${player.name}`);
    });
  
    players.forEach((item) => {
      item.moves.forEach((val) => {
        console.log(`${item.name} scored ${val.diceValue} and moved to ${val.position}`);
      });
    });
  } else {
    console.log("Game still in progress...");
  }
  