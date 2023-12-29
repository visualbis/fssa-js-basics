import React, { useState } from "react";
import "../CSS file/login.css";
// import "../CSS file/signUp.css";
import img from "../images/loginImage.png";
import { Input } from "./Input";
import { Button } from "./button";
import { Navigate, useNavigate } from "react-router-dom";

const Login = ({ onChange }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = existingUsers.find((user) => user.email === loginEmail);

    if (user && user.password === loginPassword) {
      console.log("Login successful!");
      navigate("/homepage");
      // onChange();
    } else {
      setErrorMessage("Invalid credentials. Please try again.");
      console.log("Login failed. Invalid credentials.");
    }
  };

  const handlePageChange = () => {
    navigate("/homepage");
    };

  return (
    <div className="sign-up-container">
      <img className="sign-up-image" src={img} alt="login" />
      <form className="sign-up-form" onSubmit={login}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <Input
          className="input-field"
          labelName="Email"
          inputType="email"
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <Input
          className="input-field"
          labelName="Password"
          inputType="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <br />
        {/* <Button className="submit-button" type="submit" value="Login" /> */}
        <button type="submit" onClick={handlePageChange}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
