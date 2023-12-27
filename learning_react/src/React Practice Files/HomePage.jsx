import Counter from "./Counter.jsx";
import Timer from "./Timer.jsx";
import TodoApp from "./Todo.jsx";
import Game from "./Tictactoe.jsx";
const HomePage = () => {
  return (
    <>
      <Game />
      <Counter />
      {/* <TodoApp /> */}
      <Timer />
    </>
  );
};
export { HomePage };
