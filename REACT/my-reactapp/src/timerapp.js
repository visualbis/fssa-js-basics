import React, { useState, useEffect } from 'react';
import './timer.css';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerIntervalId;

    if (isRunning) {
      timerIntervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 10);
    }

    return () => clearInterval(timerIntervalId);
  }, [isRunning]);

  const formatTimeUnit = unit => unit.toString().padStart(2, "0");
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startAndStop = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  const reset = () => {
    setTime(0);
  };

  return (
    <div className="Timer-container">
      <p className="Timer-time">
        {formatTimeUnit(hours)}:{formatTimeUnit(minutes)}:{formatTimeUnit(seconds)}:{formatTimeUnit(milliseconds)}
      </p>
      <div className="Timer-buttons">
        <button className="Timer-button" onClick={startAndStop} style={{ backgroundColor: isRunning ? "red" : "green" }}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="Timer-button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
