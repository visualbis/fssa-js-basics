import React, { useState, useEffect } from "react";
import "./App.css";
import Timer from "./timerapp";
import TodoList from "./todo-app";
import Userlogin from "./Userlogin";
import UseMemo from "./UseMemo";

export default function App() {
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

  //useCase 1
  // useEffect(() => {
  //      console.log("incside useEffect");
  // })

//   //useCase 2
//   useEffect(() => {
//     console.log("incside useEffect");
// },[])

//useCase 3
// useEffect(() => {
//   console.log("incside useEffect");
// },[count1]) // --> Pass any one of the State like count1 or count2


  return (
    <div style={{ margin: "5rem" }}>
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

      <div>
        <h2 style={{ fontWeight: "bold" }}>Timer</h2>
        <Timer />
      </div>

      <div>
        <TodoList />
      </div>

      <div>

        <h2>Hooks State Managment</h2>
        <h3>useContext, createContext, useState, useEffect --- DEMO</h3>
        <Userlogin/>
      </div>

      <div>

        <h2>UseMemo Hook</h2>
        <h3>Only for pure functions</h3>
        <UseMemo/>
      </div>
      
      {/* <div>
        <h2>Use Effect Hook</h2>
        <div className="box">
          <h1>{count1}</h1> <button onClick={() => {setCount1(count1+1)}}>INC button 1</button>
        </div>
        <div className="box">
          <h1>{count2}</h1> <button onClick={() => {setCount2(count2+1)}}>INC button 2</button>
        </div>
      </div> */}
    </div>
  );
}
