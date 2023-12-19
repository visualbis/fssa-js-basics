import "./App.css";
import Todo from "./Todo/Todo";
import Timer from "./Timer/Timer";
import CountDown from "./CountDown/CountDown";

function App() {
  return (
    <div className="main-section">
      <div>
        <h1>Todo App</h1>
        <Todo />
      </div>
      <div>
        <h1>Timer App</h1>
        <Timer />
      </div>
      <div>
        <h1>CountDown</h1>
        <CountDown />
      </div>
    </div>
  );
}

export default App;
