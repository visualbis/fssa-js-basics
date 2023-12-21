import React, { useState } from "react";
import "../css/loginForm.css"
const LoginForm = () => {
  // State variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = () => {
    // Use the username and password state values for authentication or API calls
    console.log("Submitting:", { username, password });
  };

  return (
    <div className="login-form-div-container">
      <div className="login-form-inside-div">
        <div className="login-head-container">
          <h1 className="login-form-head">Login Form </h1>
        </div>

        <div className="login-form-div">
          <form className="login-form">
            <label>
              Username:
              <input
                type="text"
                value={username}
                placeholder="Enter your name"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { LoginForm };
