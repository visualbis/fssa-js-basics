import React, { useState } from "react";
import "../CSS file/signUp.css";
import img from "../images/signUp.png";
import { Input } from "./Input.jsx";
import { Button } from "./button.jsx";

const SignUp = ({ onChange }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const register = (e) => {
    e.preventDefault();

    // Example: Simple email format validation
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
      onChange();
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      console.error("Error during registration:", error);
    }
  };
  const handlePageChange = () => {
    onChange();
  };
  return (
    <div>
      <img src={img} alt="sign up" />
      <form onSubmit={register}>
        {registrationSuccess && <p>Registration successful!</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Input
          labelName="Name"
          inputType="text"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          labelName="Email"
          inputType="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          labelName="Password"
          inputType="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit"
        value="Register Now" />

        <button type="submit" onClick={handlePageChange}>
          Login
        </button>
      </form>
    </div>
  );
};

export default SignUp;
