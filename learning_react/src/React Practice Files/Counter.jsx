import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const add = () => {
    setCount(count + 1);
  };

  const subtract = () => {
    setCount(count - 1);
  };

  const multiply = () => {
    setCount(count * 2);
  }

  const divide = () => {
    setCount(count / 2);
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={add}>Add + 1</button>
      <button onClick={subtract}>Subtract - 1</button>
      <button onClick={multiply}>Multiply * 2</button>
      <button onClick={divide}>Divide / 2</button>
    </div>
  );
};

export default Counter;
