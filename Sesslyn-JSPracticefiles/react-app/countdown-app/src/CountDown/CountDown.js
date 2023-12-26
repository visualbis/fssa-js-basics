import React, { useState } from "react";
import "./CountDown.css";
import { AiOutlineClose } from "react-icons/ai";

function CountDown() {
  const [count, setCount] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const trigger = (operation) => {
    const inputNumber = userInput !== "" ? parseInt(userInput) : 1;
    let newCount = 0;
    if (operation === "subtract") {
      newCount = count - inputNumber;
    } else {
      newCount = count + inputNumber;
    }
    if (newCount < 0) {
      setErrorMessage("Result cannot be negative");
    } else {
      setCount(newCount);
      setErrorMessage("");
    }
  };

  const handleClosePopup = () => {
    setErrorMessage("");
  };

  return (
    <>
      <article>
        <section className="card">
          <div className="text-content">
            <h3>Count Easily</h3>
            <input
              type="number"
              placeholder="Enter a number"
              value={userInput}
              onChange={handleInputChange}
            />
            <p>Click any one button to add or subtract the number</p>
            <div>
              <button onClick={() => trigger("subtract")}>
                Subtract ( - )
              </button>
              <button className="secondaryBtn" onClick={() => trigger("plus")}>
                Add ( + )
              </button>
            </div>
          </div>
          <div className="visual">
            <img src="https://iili.io/JRYQDve.jpg" alt="" />
          </div>
          <div className="result">
            <p>
              {count}
            </p>
          </div>
        </section>
        {errorMessage && (
          <p className="error">
            {errorMessage}
            <AiOutlineClose className="close-icon" onClick={handleClosePopup} />
          </p>
        )}
      </article>
    </>
  );
}

export default CountDown;
