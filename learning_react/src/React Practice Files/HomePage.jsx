// import Counter from "./Counter.jsx";
// import Timer from "./Timer.jsx";
// import TodoApp from "./Todo.jsx";
// import Game from "./Tictactoe.jsx";
import "../React Practice CSS files/Popup.css"
import { Navigate, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const Tictactoe = () => {
    navigate("/tictactoe");
  };

  const Counter = () => {
    navigate("/counter");
  };
  const timer = () => {
    navigate("/timer");
  };
  const todo = () => {
    navigate("/todoApp");
  };

  return (
    <>
      <header className="header">
        {/* <div></div> */}
         <h2>Welcome to Awesome Website</h2> 
        {/* <div></div> */}
      </header>

      <button onClick={Tictactoe}>Tictactoe</button>
      <button onClick={Counter}>Count</button>
      <button onClick={timer}>Timer</button>
      <button onClick={todo}>Todo</button>
    </>
  );
};
export { HomePage };
