import React, { useState, useEffect } from "react";
import "./Stopwatch.css";
import { BsFlag } from "react-icons/bs";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState([]);

  useEffect(() => {
    let timerIntervalId;

    if (isRunning) {
      timerIntervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    }

    return () => clearInterval(timerIntervalId);
  }, [isRunning]);

  const formatTimeUnit = (unit) => unit.toString().padStart(2, "0");
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startAndStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const reset = () => {
    setTime(0);
    setLapTimes([]);
  };

  const addLap = () => {
    setLapTimes((prevLapTimes) => [...prevLapTimes, time]);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">
          <div className="timer-group">
            <div className="timer minute">
              <div className="hand">
                <span></span>
              </div>
              <div className="hand">
                <span></span>
              </div>
            </div>
            <div className="timer second">
              <div className="hand">
                <span></span>
              </div>
              <div className="hand">
                <span></span>
              </div>
            </div>
            <div className="face">
              <h2>Stopwatch</h2>
              <p id="lazy">
                {`${formatTimeUnit(minutes)}:${formatTimeUnit(
                seconds
              )}.${formatTimeUnit(milliseconds)}`}</p>
            </div>
          </div>
          <div className="stopwatch-btns">
            <button onClick={startAndStop}>
              {isRunning ? "Stop" : "Start"}
            </button>
            <button className="stopwatch-btn" onClick={reset}>
              Reset
            </button>
            {isRunning && <BsFlag className="flag-icon" onClick={addLap} />}
          </div>
        </div>
        {lapTimes.length > 0 && (
          <div className="lap-div">
            <h2>Lap Times</h2>
            <ul>
              {lapTimes.map((lap, index, lapArray) => (
                <li key={index}>
                  {index > 0 && (
                    <span>
                      {formatTime(lapArray[index] - lapArray[index - 1])}
                    </span>
                  )}
                  <span> ----- {formatTime(lap)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;
