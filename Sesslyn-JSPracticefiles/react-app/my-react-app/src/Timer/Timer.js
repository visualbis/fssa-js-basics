import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerIntervalId;

    if (isRunning) {
      timerIntervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    }

    return () => clearInterval(timerIntervalId);
  }, [isRunning]);

  const formatTimeUnit = (unit) => unit.toString().padStart(2, '0');
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startAndStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const reset = () => {
    setTime(0);
  };

  return (
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">
          <div className="display">
            {`${formatTimeUnit(hours)}:${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}.${formatTimeUnit(milliseconds)}`}
          </div>
          <div className="btn-component">
            <button onClick={startAndStop}>
              {isRunning ? 'Stop' : 'Start'}
            </button>
            <button onClick={reset}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
