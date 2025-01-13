import "../React Practice CSS files/Popup.css";
// Popup.js
import React, { useState, useEffect } from "react";

const Popup = ({ message, onClose }) => {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      onClose();
    }
  }, [seconds, onClose]);

  return (
    <div className="popup">
      <div className="popup-content">
        <p>{message}</p>
        <p>{`Closing in ${seconds} seconds...`}</p>
      </div>
    </div>
  );
};

export default Popup;
