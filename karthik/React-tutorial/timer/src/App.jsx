import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [breakSeconds, setBreakSeconds] = useState(0);

  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // If productivity time is over, switch to break time
            setIsBreak(true);
            setMinutes(breakMinutes);
            setSeconds(breakSeconds);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, minutes, seconds, breakMinutes, breakSeconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
    setBreakMinutes(5);
    setBreakSeconds(0);
  };

  const incrementTime = () => {
    if (!isActive && minutes < 60) {
      setMinutes(minutes + 1);
    }
  };

  const decrementTime = () => {
    if (!isActive && minutes > 1) {
      setMinutes(minutes - 1);
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
      <h1>{isBreak ? 'Break Time' : 'Productivity Time'}</h1>
      <p>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </p>
      <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
      <button onClick={resetTimer}>Reset</button>
      <div>
        <h2>Set Productivity Time</h2>
        <button onClick={incrementTime}>+</button>
        <span>{minutes} minutes</span>
        <button onClick={decrementTime}>-</button>
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
