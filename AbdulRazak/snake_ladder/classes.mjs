class Player{
    name 
    rank 
    position
    id

    constructor(play){
        this.name =  play.name;
        this.id =  play.id;
        this.position = 0 ;
        this.rank = 0 
    }

    roll(){
        return Math.floor(Math.random() * 6) + 1;
    }

}
class Snake{
    from 
    to 
    constructor(snake){
        this.from = snake.head;
        this.to = snake.tail;
    }
    move(player){
        if(player.position == this.form){
            player.position =  this.to;
            return true;
        }else return false ;
    }
}
class Ladder extends Snake{
    constructor(ladder){
        super();
        this.from = ladder.bottom;
        this.to = ladder.top;
    }

}
class Data {
    ladders =  [
        { bottom: 2, top: 38 },
        { bottom: 4, top: 14 },
        { bottom: 9, top: 31 },
        { bottom: 21, top: 42 },
        { bottom: 28, top: 84 },
        { bottom: 36, top: 44 },
        { bottom: 51, top: 67 },
        { bottom: 71, top: 91 },
        { bottom: 80, top: 100 }
      ]
     ;
  snakes = [
      { head: 16, tail: 6 },
      { head: 47, tail: 26 },
      { head: 49, tail: 11 },
      { head: 56, tail: 53 },
      { head: 62, tail: 19 },
      { head: 64, tail: 60 },
      { head: 87, tail: 24 },
      { head: 93, tail: 73 },
      { head: 95, tail: 75 },
      { head: 98, tail: 78 }
    ]

}
class Game{
    ladders =  [
        { bottom: 2, top: 38 },
        { bottom: 4, top: 14 },
        { bottom: 9, top: 31 },
        { bottom: 21, top: 42 },
        { bottom: 28, top: 84 },
        { bottom: 36, top: 44 },
        { bottom: 51, top: 67 },
        { bottom: 71, top: 91 },
        { bottom: 80, top: 100 }
      ]
     ;
  snakes = [
      { head: 16, tail: 6 },
      { head: 47, tail: 26 },
      { head: 49, tail: 11 },
      { head: 56, tail: 53 },
      { head: 62, tail: 19 },
      { head: 64, tail: 60 },
      { head: 87, tail: 24 },
      { head: 93, tail: 73 },
      { head: 95, tail: 75 },
      { head: 98, tail: 78 }
    ]
 players = []; winners = 0;
     constructor(players){
        players.forEach(element=>{
            let player =  new Player(element);
            this.players.push(player);
        })

     }



   
       startGame(){
        while(this.winners < this.players.length){
            this.players.forEach((element)=>{
                let dice =  element.roll();
                element.position+=dice;
                this.snakes.forEach((snake)=>{
                    if(snake.head == element.position){
                        console.log(element.name+" have bitten by the snake")
                        element.position = snake.tail;
                    }
                })
                this.ladders.forEach((ladder)=>{
                    if(ladder.bottom == element.position){
                        console.log(element.name+ " found a ladder")
                        element.position = ladder.top;
                    }
                })
                if(element.position>=100){
                    this.winners++;
                    element.rank = this.winners;
                }

                console.log(element.name + " -  " + element.position )


            })
        }
        this.players.sort((a,b)=>{a.rank - b.rank});
        console.log("the Winners Are");
        this.players.forEach((e)=>{
            console.log( e.name)
        })
        
        
        

    }

}
let game =  new  Game([{
    name : "abdul" , id : 1 
} , { 
    name : "razak" ,id : 2 
}, {
    name : "settu " , id : 3 
}]);
game.startGame()