
let snake = [
    [62, 5],
    [33, 6],
    [49, 9],
    [88, 16],
    [41, 20],
    [56, 53],
    [98, 64],
    [93, 73],
    [95, 75]
]

let ladder = [
    [2, 37],
    [27, 46],
    [10, 32],
    [51, 68],
    [61, 79],
    [65, 84],
    [71, 91],
    [81, 100],
]


let player = ["player1", "player2", "player3", "player4"];


function playerObject(player) {
    let playerData = [];

    player.forEach((ele) => {

        let object = {
            "playerName": ele,
            "rank": 0,
            "position": 0
        }

        playerData.push(object);
    })
    // console.log(playerData);
    return playerData;
}

// playerObject(player);

function rollDice() {
    let dice = Math.floor(Math.random() * 6);
    console.log(dice);
    return dice;
}

function move(dice, playerObject) {
    let currentPosition = dice + parseInt(playerObject.position);
    console.log("currentPosition",currentPosition);
    snake.forEach((row) => {
        console.log("row",row)
        if (currentPosition === row[0]) {
            currentPosition = row[1];
        }
    })


    ladder.forEach((row) => {
        if (currentPosition === row[0]) {
            currentPosition = row[1];
        }
    })

    if (currentPosition <= 100) {
        playerObject.position = currentPosition;
    }
    return currentPosition;
}

function snakeAndLadder(player) {

    let playerData = playerObject(player);
    

    let position = 0;
   
    while (position <= 100) {
        playerData.forEach((object) => {

            let dice = rollDice();

          position +=  move(dice,object);
            console.log(playerData);
        })
    }

}
snakeAndLadder(player);