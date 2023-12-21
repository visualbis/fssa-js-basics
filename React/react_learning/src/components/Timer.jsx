import React, { useState, useEffect } from "react";
import "../css/Timer.css";
const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 59) {
                setHours((prevHours) => prevHours + 1);
                return 0;
              } else {
                return prevMinutes + 1;
              }
            });
            setSeconds(0);
          } else {
            return prevSeconds + 1;
          }
        });
      }, 100);
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
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  return (
    <div className="timer-div-container">
      <div className="timer-inside-div">
        <div className="timer-head-div">
          <h1 className="timer-head">Timer</h1>
        </div>
        <div className="timer-showing-div">
          <p className="timer-para">
            Timer: {hours + " : " + minutes + " :" + seconds} seconds
          </p>
        </div>
        <div className="timer-controller-button-div">
          <div className="timer-controller-button-inside-div">
            <button className="time-run-button" onClick={handleRunClick}>
              <i class="bi bi-play-circle"></i>Run
            </button>
            <button className="time-stop-button" onClick={handleStopClick}>
              <i class="bi bi-pause-circle"></i>Stop
            </button>
            <button className="reset-time-button" onClick={handleResetClick}>
              <i class="bi bi-vinyl"></i> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Timer };
