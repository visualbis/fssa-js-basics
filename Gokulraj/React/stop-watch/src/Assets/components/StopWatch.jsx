import "../css/StopWatch.css";
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
            <div className="head">
                <h1>Timer</h1>
            </div>

            <div className="timer"><h1>{formatTime(time)}</h1></div>
            <div className="flex">
                <div className="controls">
                    <button className="control-btn" onClick={startStop} style={{ backgroundColor: isRunning ? 'red' : 'blue' }}
                    >
                        {isRunning ? 'Stop' : 'Start'}

                    </button>

                    <button className="control-btn" style={{ backgroundColor: "#ff0000" }} onClick={reset}>
                        Reset
                    </button>

                    <button className="control-btn" style={{ backgroundColor: "black" }} onClick={addLap} disabled={!isRunning}>
                        Lap
                    </button>
                </div>

                <div className="laps">
                    <h2>Lap</h2>
                    <ul>
                        {laps.slice().reverse().map((lap, index) => (
                            <div key={index} >
                                <li className="lap-item">
                                    {`#${index + 1} ${formatTime(lap)}`}
                                </li>
                                {index < laps.length - 1 && <hr className="hr" />}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const formatTime = (timeInMilliseconds) => {
    const minutes = Math.floor(timeInMilliseconds / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
    const milliseconds = timeInMilliseconds % 1000;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(
        milliseconds
    ).padStart(3, '0').slice(0, 2)}`;
};

export default Stopwatch;
