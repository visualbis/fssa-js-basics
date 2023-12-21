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

      if (count === 9) {
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

      if (count % 2 === 0) {
        newData[index] = "x";
      } else {
        newData[index] = "o";
      }

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

  return (
    <div className="ticTacContainer">
      <h1 className="title">Tic Tac Toe</h1>
      <div className="result">{winner && `Winner: ${winner}`}</div>
      <div className="board">
        <div className="row1">
          {data.slice(0, 3).map((value, index) => (
            <div key={index} className="boxes" onClick={() => toggle(index)}>
              {value === "x" && <img src={cross} alt="cross" />}
              {value === "o" && <img src={circle} alt="circle" />}
            </div>
          ))}
        </div>

        <div className="row2">
          {data.slice(3, 6).map((value, index) => (
            <div key={index + 3} className="boxes" onClick={() => toggle(index + 3)}>
              {value === "x" && <img src={cross} alt="cross" />}
              {value === "o" && <img src={circle} alt="circle" />}
            </div>
          ))}
        </div>

        <div className="row3">
          {data.slice(6, 9).map((value, index) => (
            <div key={index + 6} className="boxes" onClick={() => toggle(index + 6)}>
              {value === "x" && <img src={cross} alt="cross" />}
              {value === "o" && <img src={circle} alt="circle" />}
            </div>
          ))}
        </div>
      </div>
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
