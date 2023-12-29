import React, { useState } from "react";
import "../CSS file/login.css";
import img from "../images/signUp.png";
import { Input } from "./Input.jsx";
import { Button } from "./button.jsx";
import { Navigate, useNavigate } from "react-router-dom";

const SignUp = ({ onChange }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const newUser = {
      userId: Date.now(),
      name: name,
      email: email,
      password: password,
      createdDate: new Date().toISOString().slice(0, 10),
    };

    try {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const isDuplicate = existingUsers.some(
        (user) => user.email === newUser.email
      );

      if (isDuplicate) {
        setErrorMessage("This email address is already registered.");
        return;
      }

      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      setRegistrationSuccess(true);
      setErrorMessage("");
      console.log("User Registered:", newUser);
      navigate('/login');
      // onChange();
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      console.error("Error during registration:", error);
    }
  };

  const handlePageChange = () => {
    navigate('/login');
    // onChange();
  };

  return (
    <div className="sign-up-container">
      <img className="sign-up-image" src={img} alt="sign up" />
      <form className="sign-up-form" onSubmit={register}>
        {registrationSuccess && (
          <p className="success-message">Registration successful!</p>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Input
          className="input-field"
          labelName="Name"
          inputType="text"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          className="input-field"
          labelName="Email"
          inputType="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="input-field"
          labelName="Password"
          inputType="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button className="submit-button" type="submit" value="Register Now" />
        {/* <Button className="login-button" type="submit" value="Login" onClick={handlePageChange}/> */}

        <button
          className="login-button"
          type="submit"
          onClick={handlePageChange}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignUp;
