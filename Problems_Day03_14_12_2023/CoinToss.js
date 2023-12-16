// The program should count the number of heads and tails, determine the winner based on the higher count, and print the results.
const tosses = [1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0];

const countTosses = (tosses, value) => tosses.filter(toss => toss === value).length;

const Player1 = countTosses(tosses, 0); // Player 1 values
const Player2 = countTosses(tosses, 0); // Player 2 values

if (Player1 > Player2) {
  console.log(`Player1 wins -> heads => Total Points: ${Player1}`);
} else if (Player1 < Player2) {
  console.log(`Player2 wins - tails => Total Points: ${Player2}`);
} else {
  console.log(`Match tied. Both are equal with ${Player1} points.`);
}

console.log(`Player1: ${Player1}`);
console.log(`Player2: ${Player2}`);
console.log(`Total tosses: ${tosses.length}`);
