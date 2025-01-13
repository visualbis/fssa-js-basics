import React, { useState, useEffect } from "react";
import "./timer.css";
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlag,
  faPause,
  faPlay,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Initial time in milliseconds
  const [isActive, setIsActive] = useState(false);
  const [lapTimes, setLapTimes] = useState([]);

  useEffect(() => {
    let timer;

    if (isActive) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment by 10 milliseconds
      }, 10);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isActive]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(0);
    setLapTimes([]);
  };

  const addLap = () => {
    setLapTimes((prevLapTimes) => [...prevLapTimes, time]);
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millisecondsFormatted = milliseconds % 100;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}.${String(millisecondsFormatted).padStart(2, "0")}`;
  };

  return (
    <div className="container">
      <h2>Stopwatch</h2>
      <div>
        <p className="timeblock">{formatTime(time)}</p>
        <button onClick={toggleTimer}>
          {isActive ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>

        <button
          onClick={resetTimer}
          style={{ display: isActive ? "none" : "" }}
        >
          <FontAwesomeIcon icon={faRefresh} />
        </button>
        <button onClick={addLap} style={{ display: isActive ? " " : "none" }}>
          <FontAwesomeIcon icon={faFlag} />
        </button>
      </div>
      <div>
        <h4>Lap Times</h4>
        <ul className="timelaps">
          {lapTimes.map((lap, index, lapArray) => (
            <li key={index}>
              {index > 0 && <span> + {formatTime(lap - lapArray[index - 1])}</span>}
              <span> {formatTime(lap)} </span> 
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stopwatch;
