import React, { useState, useEffect } from 'react';
import './timer.css'

const PomodoroTimer = () => {
  const [time, setTime] = useState(1500); // Initial time in seconds (25 minutes)
  const [isActive, setIsActive] = useState(false);
  const [lapTimes, setLapTimes] = useState([]);

  useEffect(() => {
    let timer;

    if (isActive && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(1500);
    setLapTimes([]);
  };

  const addLap = () => {
    setLapTimes((prevLapTimes) => [...prevLapTimes, time]);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Pomodoro Timer with Lap</h1>
      <div>
        <p>{formatTime(time)}</p>
        <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
        <button onClick={resetTimer}>Reset</button>
        <button onClick={addLap}>Add Lap</button>
      </div>
      <div>
        <h2>Lap Times</h2>
        <ul>
          {lapTimes.map((lap, index) => (
            <li key={index}>{formatTime(lap)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PomodoroTimer;
