import React, { useState, useEffect, useRef } from "react";
import "../React Practice CSS files/Timer.css"
// import { Button } from "../React file/button";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const lapListRef = useRef([]);
  const intervalRef = useRef();

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleStart = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
  };

  const handlePause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleStop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
    lapListRef.current = [];
  };

  const handleLap = () => {
    lapListRef.current = [...lapListRef.current, time];
  };

  const formatTime = (timeInMillis) => {
    const milliseconds = timeInMillis % 1000;
    const seconds = Math.floor((timeInMillis / 1000) % 60);
    const minutes = Math.floor((timeInMillis / (1000 * 60)) % 60);

    const formatNumber = (num) => (num < 10 ? `0${num}` : num);
    const millisecondsFormat = (num) => {
      if (num < 10) {
        return `0${num}`;
      } else if (num > 99) {
        return `${Math.floor(num / 10)}`;
      } else {
        return `${num}`;
      }
    };

    return `${formatNumber(minutes)}:${formatNumber(
      seconds
    )}:${millisecondsFormat(milliseconds)}`;
  };

  return (
    <div className="timer-container">
      <h1>{formatTime(time)}</h1>

      <div className="container">
        <div className="button-container">
          <button onClick={handleStart} disabled={isRunning}>
            Start
          </button>
          <button onClick={handlePause} disabled={!isRunning}>
            Pause
          </button>
          <button onClick={handleStop} disabled={!isRunning && time === 0}>
            Reset
          </button>
          <button onClick={handleLap} disabled={!isRunning && time === 0}>
            Lap Time
          </button>
        </div>
      </div>

      <div className="lap-list">
        <p>Total Lap Count: {lapListRef.current.length}</p>

        <h2>Lap Times:</h2>
        <ul>
          {lapListRef.current.map((lapTime, index) => (
            <li key={index}>
              {index + 1}: {formatTime(lapTime)}
              {index > 0 && (
                <span>
                  {" "}
                  ({formatTime(lapTime - lapListRef.current[index - 1])})
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Timer;
