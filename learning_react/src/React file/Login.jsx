import React, { useState } from "react";
import "../CSS file/login.css";
import img from "../images/loginImage.png";
import { Input } from "./Input";
// import { Button } from "./button";

const Login = ({ onChange }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = existingUsers.find((user) => user.email === loginEmail);

    if (user && user.password === loginPassword) {
      console.log("Login successful!");
      onChange();
    } else {
      setErrorMessage("Registration failed. Please try again.");
      console.log("Login failed. Invalid credentials.");
    }
  };

  const handlePageChange = () => {
    onChange();
  };

  return (
    <div>
      <img src={img} alt="login" />
      <form onSubmit={login}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <Input
          labelName="Email"
          inputType="email"
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <Input
          labelName="Password"
          inputType="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <br />
        {/* <Button type="submit" value="Login" /> */}
        <button type="submit" onClick={handlePageChange}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
