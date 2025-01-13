import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const add = () => {
    setCount(count + 1)
  }

  const sub = () => {
    setCount(count - 1)
  }

  return (
    <div>
      <p> {count} </p>
      <button onClick={add}>+</button>
      <button onClick={sub}>-</button>
    </div>
  )
}

export default Counter;