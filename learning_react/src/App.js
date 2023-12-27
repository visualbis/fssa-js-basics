import "./App.css";
import "./index.css";
import { HomePage } from "./React Practice Files/HomePage";
import Login from "./React file/Login";
import SignUp from "./React file/SignUp";
import { useState } from "react";

function App() {
  const pages = [
    // <SignUp onChange={() => setPageIndex(1)}/>,
    // <Login onChange={() => setPageIndex(2)}/>,
    <HomePage/>
  ];

  const [pageIndex , setPageIndex] = useState(0);

  return <div className="App">
    {pages[pageIndex]}
  </div>;
}

export default App;
