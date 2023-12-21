import "../css/App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Counter } from "../components/Counter.jsx";
import { ToDo } from "../components/Todo.jsx";
import { Timer } from "../components/Timer.jsx";
import { LoginForm } from "./Login.jsx";

function App() {
  return (
    <div id="App">
      <div className="app-inside-div-container">
        <div className="counter-timer-div-container">
          <div className="counter-timer-inside-div">
            <Counter />
            <Timer />
            <LoginForm />
          </div>
        </div>
        <div className="todo-login-form-div-container">
          <div className="todo-login-form-inside-div">
            <ToDo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
