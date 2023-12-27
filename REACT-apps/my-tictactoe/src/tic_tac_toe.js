import React, { useState, useEffect } from "react";
import "./tic_tac_toe.css";
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
          updateScore(winningPlayer);
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
    setPlayers((prevPlayers) => {
      const newPlayers = { ...prevPlayers };
      newPlayers[winningPlayer].score += 1;
      return newPlayers;
    });
    localStorage.setItem("players", JSON.stringify(players));
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
  const resetGame = () => {
    setData([...initialData]);
    setCount(0);
    setLock(false);
    setWinner(null);
    setCurrentPlayer("player1");
  };
  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players"));
    if (storedPlayers) {
      setPlayers(storedPlayers);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);
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
      <h1 className="title">Tic Tac Toe <span className="reactHead">React</span></h1>
      {showStartModal && (
        <div className="startModal">
          <h5>Enter Player Names</h5>
          <input
            type="text"
            placeholder="Player 1 Name"
            onChange={(e) =>
              setPlayers({
                ...players,
                player1: { ...players.player1, name: e.target.value },
              })
            }
          />
          <input
            type="text"
            placeholder="Player 2 Name"
            onChange={(e) =>
              setPlayers({
                ...players,
                player2: { ...players.player2, name: e.target.value },
              })
            }
          />
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
            {winner !== "Draw" ? (
              <>
                🎊 Winner is : {players[winner].name}
                <img
                  src={players[winner].symbol === "x" ? cross : circle}
                  alt="winner"
                  style={{ maxWidth: "1rem", marginLeft: "5px" }}
                />
              </>
            ) : (
              "It's a Draw!"
            )}
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
                  ? "#61DAFB"
                  : "gray"
                : "gray",
            color: players.player1.symbol === "x" ? "black" : "white",
          }}
        >
          {players.player1.name}
        </div>
        <div
          className="players"
          style={{
            backgroundColor:
              players.player2.symbol === "o"
                ? currentPlayer === "player2"
                  ? "#61DAFB"
                  : "gray"
                : "gray",
            color: players.player2.symbol === "o" ? "black" : "white",
          }}
        >
          {players.player2.name}
        </div>
      </div>
      <div className="board" style={{ display: showBoard ? " " : "none" }}>
        <div className="row1">{renderRow(0, 3)}</div>
        <div className="row2">{renderRow(3, 6)}</div>
        <div className="row3">{renderRow(6, 9)}</div>
      </div>
      <button className="reset" onClick={resetGame} style={{ display: showBoard ? " " : "none" }}>
        Reset
      </button>
    </div>
  );
};
export default TicTacToe;
