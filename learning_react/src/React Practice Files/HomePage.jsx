import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../React file/button";
import Game from "./Tictactoe";
import Counter from "./Counter";
import Timer from "./Timer";
import TodoApp from "./Todo";
import "../React Practice CSS files/Popup.css";
import "../CSS file/button.css"

import img from "../images/taskManagerLogo.png";

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(null);

  const TictactoeHandler = () => {
    setSelectedFeature("Tictactoe");
  };

  const CounterHandler = () => {
    setSelectedFeature("Counter");
  };

  const TimerHandler = () => {
    setSelectedFeature("Timer");
  };

  const TodoHandler = () => {
    setSelectedFeature("Todo");
  };

  const logout = () => {
    navigate("/");
  };

  const renderSelectedComponent = () => {
    switch (selectedFeature) {
      case "Tictactoe":
        return <Game />;
      case "Counter":
        return <Counter />;
      case "Timer":
        return <Timer />;
      case "Todo":
        return <TodoApp />;
      default:
        return <Game />;
    }
  };

  return (
    <>
      <header className="header">
        <img src={img} alt="logo" width="15%" />
        <h2>Welcome to Teddy</h2>
        <div className="header-button">
          <Button type="" value="Logout" onClick={logout} />
        </div>
      </header>
      <div className="Component-Container">
        <aside className="sidebar">
          <h2>Go to</h2>
          <Button type="" value="Tictactoe" onClick={TictactoeHandler} />
          <Button type="" value="Mini Calculator" onClick={CounterHandler} />
          <Button type="" value="Timer" onClick={TimerHandler} />
          <Button type="" value="Todo" onClick={TodoHandler} />
        </aside>

        <div className="main">{renderSelectedComponent()}</div>
      </div>
    </>
  );
};

export { HomePage };
