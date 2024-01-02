const tosses = [1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0]; // 0 - heads - Player1   1 - tails - Player2
let n = tosses.length;
let Player1 = 0;
let Player2 = 0;

for(let i=0; i<n; i++){
  if(tosses[i] === 0) Player1++;
  else Player2++;
}

if(Player1 > Player2) console.log("Player1 wins -> heads => Total Points : " + Player1);
else if (Player1 < Player2) console.log("Player2 wins - tails => Total Points : " + Player2);
else console.log("Match tied Both are equal with " + Player1 + " points.");
console.log("Player 1 points = " + Player1);
console.log("Player 2 points = " + Player2);
console.log("Total tosses = " + n)

