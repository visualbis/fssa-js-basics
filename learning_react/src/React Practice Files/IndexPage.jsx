// indexPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../React file/button";
import img from "../images/taskManagerLogo.png";
import "../CSS file/button.css"

const IndexPage = () => {
  const navigate = useNavigate();

  const signUp = () => {
    navigate("/signup");
  };

  const Login = () => {
    navigate("/login");
  };

  return (
    <div>
      <header className="header">
        <img src={img} alt="logo" width="15%" />
        <h2>Welcome to Teddy</h2>
        <div className="header-button">
          <Button type="" value="Sign Up" onClick={signUp} />
          <Button type="" value="Login" onClick={Login} />
        </div>
      </header>
    </div>
  );
};

export default IndexPage;
