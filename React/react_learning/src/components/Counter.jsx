import { useState } from "react";
import "../css/Counter.css";

const Counter = () => {
  const [count, setCount] = useState(1);

  const minusCount = () => {
    setCount(count - 1);
  };

  const addCount = () => {
    setCount(count + 1);
  };

  return (
    <div className="counter-div-container">
      <div className="minus-count-div">
        <button onClick={minusCount} className="minus-count-button">
          <i class="bi bi-dash-circle"></i>
          Minus
        </button>
      </div>
      <div className="count-showing-div">
        <h2 className="count-head">The current count : {count}</h2>
      </div>
      <div className="plus-count-div">
        <button onClick={addCount} className="add-count-button">
          <i class="bi bi-plus-circle"></i>
          Add
        </button>
      </div>
    </div>
  );
};

export { Counter };
