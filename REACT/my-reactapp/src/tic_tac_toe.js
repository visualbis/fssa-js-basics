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
          setWinner(data[a]);
          setLock(true);
          return;
        }
      }

      if (count === 8) {
        setWinner("Draw");
        setLock(true);
      }
    };

    checkWinner();
  }, [data, count]);

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
  };

  const resetGame = () => {
    setData([...initialData]);
    setCount(0);
    setLock(false);
    setWinner(null);
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
      <h1 className="title">
        Tic Tac Toe <span className="reactHead">React</span>
      </h1>
      <div className="result">
        {winner && (
          <div className="winningImg">
            Winner is :{" "}
            <img src={winner === "x" ? cross : circle} alt="winner" />
          </div>
        )}
      </div>
      <div className="board">
        <div className="row1">{renderRow(0, 3)}</div>
        <div className="row2">{renderRow(3, 6)}</div>
        <div className="row3">{renderRow(6, 9)}</div>
      </div>
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
