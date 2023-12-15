function tossCoin(count) {
   
    return count % 2 === 0 ? 'heads' : 'tails';
}

    let player1Score = 0;
    let player2Score = 0;
    const targetScore = 10;


    for (let round = 0; player1Score < targetScore && player2Score < targetScore; round++) {
        const result = tossCoin(round);

        
        if (result === 'heads') {
            player1Score++;
            console.log('Player 1 scores a point!');
        } else {
            player2Score++;
            console.log('Player 2 scores a point!');
        }

       
    }

    if (player1Score === targetScore) {
        console.log('Player 1 wins!');
        console.log("The total score of the player: "+player1Score);
    } else {
        console.log('Player 2 wins!');
        console.log("The total score of the player: "+player2Score);
    }


