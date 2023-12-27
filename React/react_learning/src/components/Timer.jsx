import React, { useState, useEffect } from "react";
import "../css/Timer.css";

const Timer = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setMilliseconds((prevMilliseconds) => {
          if (prevMilliseconds === 99) {
            setSeconds((prevSeconds) => {
              if (prevSeconds === 59) {
                setMinutes((prevMinutes) => prevMinutes + 1);
                return 0;
              } else {
                return prevSeconds + 1;
              }
            });
            return 0;
          } else {
            return prevMilliseconds + 1;
          }
        });
      }, 1);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  const handleRunClick = () => {
    setIsRunning(true);
  };

  const handleStopClick = () => {
    setIsRunning(false);
  };

  const handleResetClick = () => {
    setIsRunning(false);
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
    setTimestamps([]);
  };

  const handleFlagClick = () => {
    setTimestamps([
      ...timestamps,
      `${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}.${formatTimeUnit(
        milliseconds
      )}`,
    ]);
  };

  const formatTimeUnit = (unit) => {
    return unit < 10 ? `0${unit}` : unit;
  };

  return (
    <div className="timer-div-container">
      <div className="timer-inside-div">
        <div className="timer-head-div">
          <h1 className="timer-head">Stopwatch</h1>
        </div>
        <div className="timer-showing-div">
          <p className="timer-para">
            Time: {formatTimeUnit(minutes)}:{formatTimeUnit(seconds)}.
            {formatTimeUnit(milliseconds)}
          </p>
          <div className="timestamps">
            {timestamps.map((timestamp, index) => (
              <p key={index}>{`Timestamp ${index + 1}: ${timestamp}`}</p>
            ))}
          </div>
        </div>
        <div className="timer-controller-button-div">
          <div className="timer-controller-button-inside-div">
            <button className="time-run-button" onClick={handleRunClick}>
              <i className="bi bi-play-circle"></i>Run
            </button>
            <button className="time-stop-button" onClick={handleStopClick}>
              <i className="bi bi-pause-circle"></i>Stop
            </button>
            <button className="reset-time-button" onClick={handleResetClick}>
              <i className="bi bi-vinyl"></i>Reset
            </button>
            <button className="add-time-stamp-button" onClick={handleFlagClick}>
              <i className="bi bi-flag"></i>Flag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Timer };
