import React, { useState, useEffect } from "react";
import Counter from "./counter";
import PomodoroTimer from "./PomodoroTimer";
import TodoList from "./todo-app";
// import Userlogin from "./Userlogin";
// import UseMemo from "./UseMemo";

export default function App() {

  return (
    <div style={{ margin: "5rem" }}>
      <div>
        <Counter />
      </div>

      <div>
        <PomodoroTimer />
      </div>

      <div>
        <TodoList />
      </div>
  


      

  {/* useCase 1
   useEffect(() => {
        console.log("incside useEffect");
   })

//   useCase 2
//   useEffect(() => { */}
{/* //     console.log("incside useEffect");
// },[])

//useCase 3
// useEffect(() => { */}
{/* //   console.log("incside useEffect");
// },[count1]) // --> Pass any one of the State like count1 or count2 */}


  
      {/* <div>

        <h2>Hooks State Managment</h2>
        <h3>useContext, createContext, useState, useEffect --- DEMO</h3>
        <Userlogin/>
      </div>

      <div>

        <h2>UseMemo Hook</h2>
        <h3>Only for pure functions</h3>
        <UseMemo/>
    </div> */}
      
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
