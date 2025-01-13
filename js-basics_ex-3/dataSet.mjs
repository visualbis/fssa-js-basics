const coinToss = ["head", "tail", "head", "tail", "head", "tail", "head", "tail", "head", "head"];

const playerOne = "head";
const playerOneCount = coinToss.filter(result => result === playerOne).length;
const playerTwoCount = coinToss.length - playerOneCount;

if (playerOneCount > playerTwoCount) {
    console.log("Player 1 Winning");
} else if (playerOneCount < playerTwoCount) {
    console.log("Player 2 Winning");
} else {
    console.log("It's a Tie");
}
