import "./App.css";
import "./index.css";
import { HomePage } from "./React Practice Files/HomePage";
import Login from "./React file/Login";
import SignUp from "./React file/SignUp";
import Game from "./React Practice Files/Tictactoe";
import Counter from "./React Practice Files/Counter";
import Timer from "./React Practice Files/Timer";
import TodoApp from "./React Practice Files/Todo";
import IndexPage from "./React Practice Files/IndexPage";
// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // const pages = [
  //   <SignUp onChange={() => setPageIndex(1)}/>,
  //   <Login onChange={() => setPageIndex(2)}/>,
  //   <HomePage/>
  // ];

  // const [pageIndex , setPageIndex] = useState(0);

  // return <div className="App">
  //   {pages[pageIndex]}
  // </div>;

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" element={<IndexPage />} index />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/tictactoe" element={<Game />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/todoApp" element={<TodoApp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
