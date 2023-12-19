import "../css/App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Counter } from "../components/Counter.jsx";
import { ToDo } from "../components/Todo.jsx";
import { Timer } from "../components/Timer.jsx";

function App() {
  return (
    <div className="App">
      <Counter />
      <Timer />
      <ToDo />
    </div>
  );
}

export default App;
