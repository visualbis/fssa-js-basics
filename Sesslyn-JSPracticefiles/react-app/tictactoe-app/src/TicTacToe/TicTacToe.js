import React, { useState, useEffect } from "react";
import "./TicTacToe.css";
import circle from "./Assets/circle.png";
import cross from "./Assets/cross.png";

const initialData = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  const [data, setData] = useState([...initialData]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(null);
  const [players, setPlayers] = useState({
    player1: { name: "", symbol: "x" },
    player2: { name: "", symbol: "o" },
  });
  const [currentPlayer, setCurrentPlayer] = useState("player1");
  const [showStartModal, setShowStartModal] = useState(true);
  const [showBoard, setShowBoard] = useState(false);

  const startGame = (player1Name, player2Name) => {
    setPlayers({
      player1: { name: player1Name, symbol: "x", score: 0 },
      player2: { name: player2Name, symbol: "o", score: 0 },
    });
    setLock(false);
    setShowStartModal(false);
    setShowBoard(true);
  };

  useEffect(() => {
    const checkWinner = () => {
      const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (data[a] && data[a] === data[b] && data[a] === data[c]) {
          const winningPlayer = data[a] === "x" ? "player1" : "player2";
          setWinner(winningPlayer);
          setLock(true);
          return;
        }
      }

      if (count === 9 && !winner) {
        setWinner("Draw");
        setLock(true);
      }
    };

    checkWinner();
  }, [data, count, winner]);


  const updateScore = (winningPlayer) => {
    if (winningPlayer !== "Draw") {
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      newPlayers[winningPlayer].score += 1;
      return newPlayers;
    });
  }
    localStorage.setItem("players", JSON.stringify(players));
  };
 
  const resetGame = () => {
    if (winner) {
      updateScore(winner);
    }
    setData([...initialData]);
    setCount(0);
    setLock(false);
    setWinner(null);
    setCurrentPlayer("player1");
  };
  const toggle = (index) => {
    if (lock || data[index] || winner) {
      return;
    }

    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = count % 2 === 0 ? "x" : "o";
      return newData;
    });

    setCount((prevCount) => prevCount + 1);

    setCurrentPlayer((prevPlayer) =>
      prevPlayer === "player1" ? "player2" : "player1"
    );
  };

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players"));
    if (storedPlayers) {
      setPlayers(storedPlayers);
    }
  }, []);


  const restartGame = () => {
    localStorage.removeItem("players");
    setPlayers({
      player1: { name: "", symbol: "x" },
      player2: { name: "", symbol: "o" },
    });
    setData([...initialData]);
    setCount(0);
    setLock(false);
    setWinner(null);
    setCurrentPlayer("player1");
    window.location.reload();
  };
  

  const renderRow = (start, end) => {
    return data.slice(start, end).map((value, index) => (
      <div
        key={start + index}
        className="boxes"
        onClick={() => toggle(start + index)}
      >
        {value === "x" && <img src={cross} alt="cross" />}
        {value === "o" && <img src={circle} alt="circle" />}
      </div>
    ));
  };

  return (
    <div className="ticTacContainer">
      <h1 className="title">Tic Tac Toe</h1>
      {showStartModal && (
        <div className="startModal">
          <h5>Enter Player Names</h5>

          <div className="playerDetails">
            <div class="coolinput">
              <label for="input" class="text">
                Player 1:
              </label>
              <input
                type="text"
                name="input"
                onChange={(e) =>
                  setPlayers({
                    ...players,
                    player1: { ...players.player1, name: e.target.value },
                  })
                }
                class="input"
              />
            </div>

            <div class="coolinput">
              <label for="input" class="text">
                Player 2:
              </label>
              <input
                type="text"
                name="input"
                onChange={(e) =>
                  setPlayers({
                    ...players,
                    player2: { ...players.player2, name: e.target.value },
                  })
                }
                class="input"
              />
            </div>
          </div>

          {players.player1.name &&
          players.player2.name &&
          players.player1.name.trim() !== "" &&
          players.player2.name.trim() !== "" ? (
            <button
              onClick={() =>
                startGame(players.player1.name, players.player2.name)
              }
            >
              Start Game
            </button>
          ) : (
            <button onClick={() => alert("Please Enter Valid Player Names!")}>
              Start Game
            </button>
          )}
        </div>
      )}
      <div className="result">
        {winner && (
          <div className="winningImg">
            <div className="overlay">
              <div className="congrats">
                {winner !== "Draw" ? (
                  <h1>Congratulations! 🥳 {players[winner].name} won the match. 🎊</h1>
                ) : (
                  <h1>It's Draw !</h1>
                )}
                <p className="text">Game over</p>
                <button  onClick={resetGame}>
              Reset
            </button>
                <button  className='congrats-restart'onClick={restartGame}>
                  Restart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="scoreboard">
        <div
          className="players"
          style={{
            backgroundColor:
              players.player1.symbol === "x"
                ? currentPlayer === "player1"
                  ? "rgb(172, 190, 199)"
                  : "#e0dbdb"
                : "#e0dbdb",
            color: players.player1.symbol === "x" ? "black" : "white",
          }}
        >
          {players.player1.name  || "Player 1"} - {players.player1.score}
        </div>
        <div
          className="players"
          style={{
            backgroundColor:
              players.player2.symbol === "o"
                ? currentPlayer === "player2"
                  ? "rgb(172, 190, 199)"
                  : "#e0dbdb"
                : "#e0dbdb",
            color: players.player2.symbol === "o" ? "black" : "white",
          }}
        >
          {players.player2.name  || "Player 2 "} - {players.player2.score}
        </div>
      </div>
      {showBoard && (
        <div className="board">
          <div className="row1">{renderRow(0, 3)}</div>
          <div className="row2">{renderRow(3, 6)}</div>
          <div className="row3">{renderRow(6, 9)}</div>
          <div className="buttonFlex">
            <button className="reset" onClick={resetGame}>
              Reset
            </button>
            <button className="restart" onClick={restartGame}>
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
