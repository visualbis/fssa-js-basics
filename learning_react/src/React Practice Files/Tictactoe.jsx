import React, { useState, useEffect } from "react";
import "../React Practice CSS files/Tictactoe.css";
import { Input } from "../React file/Input";

const initialBoard = Array(9).fill(null);

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

const Board = () => {
  const [squares, setSquares] = useState(() => {
    const storedState = JSON.parse(localStorage.getItem("ticTacToeState"));
    return storedState || initialBoard;
  });

  const [xIsNext, setXIsNext] = useState(true);
  const [moves, setMoves] = useState([]);
  const [player1Name, setPlayer1Name] = useState(() => {
    const storedName = localStorage.getItem("player1Name");
    return storedName || "Player 1";
  });

  const [player2Name, setPlayer2Name] = useState(() => {
    const storedName = localStorage.getItem("player2Name");
    return storedName || "Player 2";
  });

  const [player1Points, setPlayer1Points] = useState(() => {
    const storedPoints = JSON.parse(localStorage.getItem("player1Points"));
    return storedPoints || 0;
  });

  const [player2Points, setPlayer2Points] = useState(() => {
    const storedPoints = JSON.parse(localStorage.getItem("player2Points"));
    return storedPoints || 0;
  });

  const [winner, setWinner] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    localStorage.setItem("player1Points", JSON.stringify(player1Points));
  }, [player1Points]);

  useEffect(() => {
    localStorage.setItem("player2Points", JSON.stringify(player2Points));
  }, [player2Points]);

  useEffect(() => {
    const currentWinner = calculateWinner(squares);

    if (currentWinner) {
      setWinner(currentWinner);

      if (currentWinner === "X") {
        setPlayer1Points((prevPoints) => prevPoints + 1);
      } else {
        setPlayer2Points((prevPoints) => prevPoints + 1);
      }

      setShowPopup(true);
    }
  }, [squares]);

  const handleClick = (i) => {
    if (winner || squares[i]) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";

    const newMoves = [...moves, { player: xIsNext ? "X" : "O", position: i }];
    setMoves(newMoves);

    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    localStorage.clear();
    setSquares(initialBoard);
    setXIsNext(true);
    setMoves([]);
    setPlayer1Points(0);
    setPlayer2Points(0);
    setWinner(null);
  };

  const handlePlayer1NameChange = (e) => {
    const newName = e.target.value;
    setPlayer1Name(newName);
    localStorage.setItem("player1Name", newName);
  };

  const handlePlayer2NameChange = (e) => {
    const newName = e.target.value;
    setPlayer2Name(newName);
    localStorage.setItem("player2Name", newName);
  };

  let status;
  if (winner) {
    status = `Congratulations ${
      winner === "X" ? player1Name : player2Name
    }, You are the winner...`;
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  } else if (squares.every((square) => square !== null)) {
    status = "Well played both of you, it is drawn";
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  } else {
    status = `${
      xIsNext
        ? `Current Player : ${player1Name} ( X )`
        : `Current Player : ${player2Name} ( O )`
    }`;
  }

  const closePopup = () => {
    setShowPopup(false);
  };

  const renderSquare = (i) => (
    <Square value={squares[i]} onClick={() => handleClick(i)} />
  );

  const renderMovesByPlayer = (player) => {
    const playerMoves = moves
      .filter((move) => move.player === player)
      .map((move, index) => (
        <div key={index}>{`${
          player === "X" ? player1Name : player2Name
        } moved to position ${move.position + 1}`}</div>
      ));
    return <div>{playerMoves}</div>;
  };

  const Popup = ({ message, onClose }) => {
    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      if (seconds === 0) {
        onClose();
      }
    }, [seconds, onClose]);

    return (
      <div className="popup">
        <div className="popup-content">
          <p>{message}</p>
          <p>{`Closing in ${seconds} seconds...`}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="game-container">
      <button className="reset-button" onClick={handleReset}>
        Reset Game
      </button>
      {showPopup && (
        <Popup
          message={`Congratulations ${
            winner === "X" ? player1Name : player2Name
          }, You are the winner...`}
          onClose={closePopup}
        />
      )}
      <div className="box-container">
        <div className="player-info">
          <Input
            inputType="text"
            value={player1Name}
            onChange={handlePlayer1NameChange}
            labelName="Player 1 Name: "
          />
          <h2>Points: {player1Points}</h2>
          <h2>{`${player1Name} Moves:`}</h2>
          {renderMovesByPlayer("X")}
        </div>

        <div className="board">
          <div className="status">{status}</div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>

        <div className="player-info">
          <Input
            inputType="text"
            value={player2Name}
            onChange={handlePlayer2NameChange}
            labelName="Player 2 Name: "
          />

          <h2>Points: {player2Points}</h2>
          <h2>{`${player2Name} Moves:`}</h2>
          {renderMovesByPlayer("O")}
        </div>
      </div>
    </div>
  );
};

const Game = () => (
  <div className="game">
    <div className="game-board">
      <Board />
    </div>
  </div>
);

export default Game;
