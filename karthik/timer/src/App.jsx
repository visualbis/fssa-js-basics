import React, { useState, useEffect } from 'react';
import './App.css';

const PomodoroTimer = () => {
  const getFormattedTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  const [isActive, setIsActive] = useState(false);
  const [productivityMinutes, setProductivityMinutes] = useState(25);
  const [productivitySeconds, setProductivitySeconds] = useState(0);
  const [initialProductivityMinutes, setInitialProductivityMinutes] = useState(25);
  const [isBreak, setIsBreak] = useState(false);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [currentTime, setCurrentTime] = useState(getFormattedTime());

  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
        if (isBreak) {
          if (breakSeconds === 0) {
            if (breakMinutes === 0) {
              setIsBreak(false);
              setProductivityMinutes(initialProductivityMinutes);  // Reset productivity time when break is over
              setProductivitySeconds(0);
            } else {
              setBreakMinutes(breakMinutes - 1);
              setBreakSeconds(59);
            }
          } else {
            setBreakSeconds(breakSeconds - 1);
          }
        } else {
          if (productivitySeconds === 0) {
            if (productivityMinutes === 0) {
              setIsBreak(true);
              setBreakMinutes(5);
              setBreakSeconds(0);
            } else {
              setProductivityMinutes(productivityMinutes - 1);
              setProductivitySeconds(59);
            }
          } else {
            setProductivitySeconds(productivitySeconds - 1);
          }
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, productivityMinutes, productivitySeconds, breakMinutes, breakSeconds, isBreak, initialProductivityMinutes]);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(getFormattedTime());
    };

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setProductivityMinutes(initialProductivityMinutes);
    setProductivitySeconds(0);
    setBreakMinutes(5);
    setBreakSeconds(0);
  };

  const incrementProductivityTime = () => {
    if (!isActive && initialProductivityMinutes < 60) {
      setProductivityMinutes(initialProductivityMinutes + 1);
      setInitialProductivityMinutes(initialProductivityMinutes + 1);
    }
  };

  const decrementProductivityTime = () => {
    if (!isActive && initialProductivityMinutes > 1) {
      setProductivityMinutes(initialProductivityMinutes - 1);
      setInitialProductivityMinutes(initialProductivityMinutes - 1);
    }
  };

  const incrementBreakTime = () => {
    if (!isActive && breakMinutes < 60) {
      setBreakMinutes(breakMinutes + 1);
    }
  };

  const decrementBreakTime = () => {
    if (!isActive && breakMinutes > 1) {
      setBreakMinutes(breakMinutes - 1);
    }   
  };

  return (
    <div>
      <div id="current-time" className='current-time'>{currentTime}</div>
      <h1>{isBreak ? 'Break Time' : 'Productivity Time'}</h1>
      <p>
        {String(isBreak ? breakMinutes : productivityMinutes).padStart(2, '0')}:{String(isBreak ? breakSeconds : productivitySeconds).padStart(2, '0')}
      </p>
      <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
      <button onClick={resetTimer}>Reset</button>
      <div>
        <h2>Set Productivity Time</h2>
        <button onClick={incrementProductivityTime}>+</button>
        <span>{initialProductivityMinutes} minutes</span>
        <button onClick={decrementProductivityTime}>-</button>
      </div>
      <div>
        <h2>Set Break Time</h2>
        <button onClick={incrementBreakTime}>+</button>
        <span>{breakMinutes} minutes</span>
        <button onClick={decrementBreakTime}>-</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
