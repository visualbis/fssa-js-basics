import React, { useState } from "react";
import "./App.css";
import Todo from "./Todo/Todo";
import Timer from "./Timer/Timer";
import CountDown from "./CountDown/CountDown";
import TicTacToe from "./TicTacToe/TicTacToe";

function App() {
  const [selectedProject, setSelectedProject] = useState("todo");

  const handleProjectChange = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="main-section">
      <div>
        <div className="project-buttons">
          <button onClick={() => handleProjectChange("todo")}>Todo</button>
          <button onClick={() => handleProjectChange("timer")}>Timer</button>
          <button onClick={() => handleProjectChange("countdown")}>CountDown</button>
          <button onClick={() => handleProjectChange("tictactoe")}>Tic TacToe</button>
        </div>
        {selectedProject === "todo" && (
          <>
            <h1>Todo App</h1>
            <Todo />
          </>
        )}
        {selectedProject === "timer" && (
          <>
            <h1>Timer App</h1>
            <Timer />
          </>
        )}
        {selectedProject === "countdown" && (
          <>
            <h1 className='countDownHeading'>CountDown</h1>
            <CountDown />
          </>
        )}
        {selectedProject === "tictactoe" && (
          <>
            <TicTacToe />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
