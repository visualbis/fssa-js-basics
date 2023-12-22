import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [sessionType, setSessionType] = useState('Work');
  const [time, setTime] = useState(1500); // Initial time in seconds (25 minutes for work session)
  const [isActive, setIsActive] = useState(false);
  const [lapTimes, setLapTimes] = useState([]);

  useEffect(() => {
    let timer;

    if (isActive && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      // Switch between Work and Break sessions
      setSessionType((prevType) => (prevType === 'Work' ? 'Break' : 'Work'));
      setTime(sessionType === 'Work' ? 300 : 150); // 5 minutes break, 25 minutes work
    }

    return () => {
      clearInterval(timer);
    };
  }, [isActive, time, sessionType]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSessionType('Work');
    setTime(1500); // Reset to 25 minutes for work session
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
      <h1>{sessionType} Session</h1>
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
