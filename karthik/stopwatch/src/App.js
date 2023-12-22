import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [lapStartTime, setLapStartTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startAndStop = () => {
    if (isRunning) {
      const lapTime = time - lapStartTime;
      setLaps([...laps, lapTime]);
      setLapStartTime(time); // Update lap start time to the current time
    } else {
      setLapStartTime(time);
    }
    setIsRunning(!isRunning);
  };
  

  const reset = () => {
    setTime(0);
    setLaps([]);
    setLapStartTime(0);
  };

  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time">
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>
      <div className="stopwatch-buttons">
        <button className="stopwatch-button" onClick={startAndStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="stopwatch-button-reset" onClick={reset}>
          Reset
        </button>
        <button className="stopwatch-button-addlap" onClick={startAndStop}>
          Lap
        </button>
      </div>
      {laps.length > 0 && (
        <div className="stopwatch-laps">
          <h2>Laps:</h2>
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>
                Lap {index + 1}: {formatTime(lap)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const formatTime = (time) => {
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
};

export default App;
