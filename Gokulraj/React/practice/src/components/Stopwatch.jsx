import React, { useState, useEffect } from 'react';

 
const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);
 
    useEffect(() => {
      let interval;
 
      if (isRunning) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 10);
        }, 10);
      }
 
      return () => clearInterval(interval);
    }, [isRunning]);
 
    const startStop = () => {
      setIsRunning(!isRunning);
    };
 
    const reset = () => {
      setIsRunning(false);
      setTime(0);
      setLaps([]);
    };
 
    const addLap = () => {
      setLaps([time, ...laps]);
    };
 
    return (
      <div className="stopwatch">
        <div className="timer">{formatTime(time)}</div>
        <div className="controls">
          <button onClick={startStop}>{isRunning ? 'Stop' : 'Start'}</button>
          <button onClick={reset}>Reset</button>
          <button onClick={addLap} disabled={!isRunning}>
            Lap
          </button>
        </div>
        <div className="laps">
          <h2>Lap</h2>
          <ul>
            {laps.slice().reverse().map((lap, index) => (
              <li key={index}>{`Lap ${index + 1}: ${formatTime(lap)}`}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
 
  const formatTime = (timeInMilliseconds) => {
    const minutes = Math.floor(timeInMilliseconds / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
    const milliseconds = timeInMilliseconds % 1000;
 
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0').slice(0, 2)}`;
  };
 
  export default Stopwatch;
 