class Player {
    constructor(name) {
      this.name = name;
      this.position = 0;
    }
  }
  
  class SnakeLadderGame {
    constructor(boardSize = 100) {
      this.boardSize = boardSize;
      this.snakes = [];
      this.ladders = [];
      this.players = [];
    }
  
    addSnake(head, tail) {
      this.snakes.push({ head, tail });
    }
  
    addLadder(start, end) {
      this.ladders.push({ start, end });
    }
  
    addPlayer(name) {
      this.players.push(new Player(name));
    }
  
    rollDice() {
      return Math.floor(Math.random() * 6) + 1;
    }
  
    playGame() {
      while (true) {
        for (const player of this.players) {
          const diceValue = this.rollDice();
          player.position += diceValue;
  
          
          for (const snake of this.snakes) {
            if (player.position === snake.head) {
              player.position = snake.tail;
            }
          }
  
          for (const ladder of this.ladders) {
            if (player.position === ladder.start) {
              player.position = ladder.end;
            }
          }
  
          
          player.position = Math.min(player.position, this.boardSize);
  
          console.log(
            `${player.name} rolled a ${diceValue} and moved from 0 to ${player.position}`
          );
  
          
          if (player.position === this.boardSize) {
            console.log(`${player.name} wins the game`);
            return;
          }
        }
      }
    }
  }
  
  
  const game = new SnakeLadderGame();
  
  
  game.addSnake(62, 5);
  game.addSnake(33, 6);
  
  game.addLadder(2, 37);
  game.addLadder(27, 46);
  
  
  game.addPlayer("Gowtham");
  game.addPlayer("Mullai");
  
  
  game.playGame();
  