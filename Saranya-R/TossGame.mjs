const tosses = [1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0,1];

const playerCounts = tosses.reduce(
  (counts, toss) => {
    counts[toss === 0 ? 'Player1' : 'Player2']++;
    return counts;
  },
  { Player1: 0, Player2: 0 }
);

const { Player1, Player2 } = playerCounts;
const winner = Player1 > Player2 ? 'Player1' : Player1 < Player2 ? 'Player2' : 'Tie';

console.log(`${winner === 'Tie' ? 'Match tied' : `${winner} wins`} with ${Math.max(Player1, Player2)} points.`);
console.log(`Player1: ${Player1}`);
console.log(`Player2: ${Player2}`);
console.log(`Total tosses: ${tosses.length}`);
