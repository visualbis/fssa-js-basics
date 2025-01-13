import React, { useState } from "react";


function Counter() {
  const [counter, setCounter] = useState(1);

    const increment = ()=> {
      setCounter(counter + 1);
    }

    const decrement = ()=>{
      setCounter(counter - 1);
    }

    return (
    <div className="All">
      <button onClick={decrement}>-</button>
       <h1>Counter : {counter}</h1>

       <button onClick={increment}>+</button>
       </div>
    )
}

export default Counter;
