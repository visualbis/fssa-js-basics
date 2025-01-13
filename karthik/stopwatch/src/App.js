import React, { useState, useEffect, useRef } from "react";
import "./App.css"; // Make sure to import the CSS file

const Stopwatch = () => {
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);
  const lastLapTimeRef = useRef(0); // To keep track of the last lap time

  const startStopwatch = () => {
    setStartTime(Date.now() - currentTime);
  };

  const stopStopwatch = () => {
    clearInterval(intervalRef.current);
    setStartTime(0);
  };

  const resetStopwatch = () => {
    setCurrentTime(0);
    setStartTime(0);
    setLaps([]);
    lastLapTimeRef.current = 0; // Reset last lap time
  };

  const recordLap = () => {
    const currentLapTime = currentTime - lastLapTimeRef.current;
    setLaps([...laps, { lapTime: currentLapTime, lapDifference: currentLapTime - laps[laps.length - 1]?.lapTime }]);
    lastLapTimeRef.current = currentTime;
  };

  // Function to format time in desired units (minutes, seconds, milliseconds)
  const formatTime = (timeInMilliseconds) => {
    const totalSeconds = Math.floor(timeInMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((timeInMilliseconds % 1000) / 10); // Display two-digit milliseconds

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMilliseconds = String(milliseconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  };

  // Function to format laps output in desired units
const formatLap = (lapInMilliseconds) => {
  const absoluteLapTime = Math.abs(lapInMilliseconds);

  const totalSeconds = Math.floor(absoluteLapTime / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((absoluteLapTime % 1000) / 10); // Display two-digit milliseconds

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMilliseconds = String(milliseconds).padStart(2, "0");

  const sign = lapInMilliseconds < 0 ? '-' : ''; // Add a sign for negative lap differences

  return `${sign}${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
};

  useEffect(() => {
    if (startTime) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(Date.now() - startTime);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [startTime]);

  return (
    <div className="stopwatch-container">
      <div className="stopwatch-time">{formatTime(currentTime)}</div>
      <div className="stopwatch-buttons">
        <button onClick={startStopwatch}>Start</button>
        <button className="stopwatch-button-reset" onClick={stopStopwatch}>
          Stop
        </button>
        <button onClick={resetStopwatch} className="stopwatch-button-reset">Reset</button>
        <button className="stopwatch-button-addlap" onClick={recordLap}>
          Lap
        </button>
      </div>
      <div className="stopwatch-laps">
        <h2>Lap Times</h2>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>
              Lap {index + 1}: {formatLap(lap.lapTime)} 
              {index > 0 && `, Difference: ${formatLap(lap.lapDifference)}`}
            </li>
          ))} 
        </ul>
      </div>
    </div>
  );
};

export default Stopwatch;
