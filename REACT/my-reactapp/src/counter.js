import React, {useState} from 'react'

const Counter = () => {

     //Counter
  const [count, setCount] = useState(0);

  const triggerCount = () => {
    setCount(count + 1);
  };

  const triggerDeduct = () => {
    setCount(count - 1);
  };

  //useEffect Hooks
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);


  return (
    <div>
        <h1>Hello Lumelities...</h1>
      <h2 style={{ fontWeight: "bold" }}>Counter</h2>
      <p>
        Start editing to see some magic happen:
        <span
          style={{
            fontWeight: "bold",
            color: count < 0 ? "red" : count === 0 ? "orange" : "green",
          }}
        >
          {count}
        </span>
      </p>

      <button
        onClick={triggerDeduct}
        style={{
          backgroundColor: "red",
          color: "white",
          border: "none",
          fontSize: "120%",
          borderRadius: "5px",
        }}
      >
        {" "}
        -{" "}
      </button>
      <span style={{ padding: "1rem" }}>Buttons</span>
      <button
        onClick={triggerCount}
        style={{
          backgroundColor: "green",
          color: "white",
          border: "none",
          fontSize: "110%",
          borderRadius: "5px",
        }}
      >
        {" "}
        +{" "}
      </button>

    </div>
  )
}

export default Counter