import React, { useState } from "react";
import "./CountDown.css"; 

function CountDown() {
  const [count, setCount] = useState(1);

  const triggerCount = () => {
    setCount(count + 1);
  };

  const triggerDeduct = () => {
    setCount(count - 1);
  };

  return (
    <div className="countDown">
      <h2>Hello Lumelities</h2>
      <p>Start editing to see some magic happen: {count}</p>
      <button onClick={triggerDeduct}> - </button>
      <span>Buttons</span>
      <button onClick={triggerCount}> + </button>
    </div>
  );
}

export default CountDown;
