import React, { useState, useEffect } from "react";

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
                setMinutes(0);
              } else {
                setMinutes((prevMinutes) => prevMinutes + 1);
                setSeconds(0);
              }
            });
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
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  return (
    <div>
      <h1>Timer: {hours + " : " + minutes + " :" + seconds} seconds</h1>
      <button onClick={handleRunClick}>
        <i class="bi bi-play-circle"></i>Run
      </button>
      <button onClick={handleStopClick}>
        <i class="bi bi-pause-circle"></i>Stop
      </button>
    </div>
  );
};

export { Timer };
