import React, { useState, useEffect } from "react";
import "../Assets/TicTacToe.css";
import circleIcon from "../Assets/Images/circle.png";
import crossIcon from "../Assets/Images/cross.png";

function TicTacToe() {
    const initialData = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    const [data, setData] = useState(initialData);
    const [count, setCount] = useState(0);
    const [complete, setComplete] = useState(false);
    const [winner, setWinner] = useState("");

    const playGame = () => {
        return count % 2 === 0 ? "X" : "O";
    };


    const toggle = (rowIndex, columnIndex) => {

        if (data[rowIndex][columnIndex] === null && !complete) {

            const value = playGame();
            setCount(count + 1);

            let newData = [...data];
            newData[rowIndex][columnIndex] = value;
            setData(newData);
            console.log("newData", newData);

            const gameWinner = checkWinner(newData);
            console.log(gameWinner)
            if (gameWinner !== null) {
                setComplete(true);
                setWinner(gameWinner);
            }

        }
    };
    const checkWinner = (squares) => {
        // Check rows
        for (let i = 0; i < squares.length; i++) {
            const [a, b, c] = squares[i];
            if (a && a === b && a === c) {
                return a;
            }
        }

        // Check columns
        for (let i = 0; i < squares[0].length; i++) {
            const a = squares[0][i];
            const b = squares[1][i];
            const c = squares[2][i];
            if (a && a === b && a === c) {
                return a;
            }
        }

        // Check diagonals
        const diag1 = squares[0][0];
        const diag2 = squares[0][2];
        if (diag1 && diag1 === squares[1][1] && diag1 === squares[2][2]) {
            return diag1;
        } else if (diag2 && diag2 === squares[1][1] && diag2 === squares[2][0]) {
            return diag2;
        }

        if(count === data.length + data[0].length + 2){
            return "Draw"
        }

        return null;

        
    };


    const resetGame = () => {
        setData(initialData);
        setCount(0);
        setComplete(false);
        setWinner("");
    };

    useEffect(() => {
        console.log(winner);
    }, [winner]);

    return (
        <div className="container">
            <h1>TIC TAC TOE</h1>
            <div className="board">
                {data.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((playerSymbol, columnIndex) => (
                            <div
                                key={columnIndex}
                                className="boxes"
                                onClick={() => toggle(rowIndex, columnIndex)}
                            >
                                {playerSymbol === "X" && (
                                    <img src={crossIcon} className="cross-icon" alt="Cross Icon" />
                                )}
                                {playerSymbol === "O" && (
                                    <img src={circleIcon} className="circle-icon" alt="Circle Icon" />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <h1>{winner !== "" ? `Winner: ${winner}` : ""}</h1>
            <button onClick={resetGame}>Rematch</button>
        </div>
    );
}

export default TicTacToe;
