import React, { useState } from "react";
import "../React Practice CSS files/Counter.css";
import { Button } from "../React file/button";
import { Input } from "../React file/Input";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const reset = () => {
    setCount(0);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const performOperation = (operation) => {
    const inputValueAsNumber = parseFloat(inputValue);

    if (!isNaN(inputValueAsNumber)) {
      switch (operation) {
        case "add":
          setCount(count + inputValueAsNumber);
          break;
        case "subtract":
          setCount(count - inputValueAsNumber);
          break;
        case "multiply":
          setCount(count * inputValueAsNumber);
          break;
        case "divide":
          if (inputValueAsNumber !== 0) {
            setCount(count / inputValueAsNumber);
          } else {
            alert("Cannot divide by zero!");
          }
          break;
        default:
          break;
      }
    } else {
      alert("Please enter a valid number!");
    }
  };

  return (
    <div>
      <div className="container">
        <Button type="submit" value="Reset" onClick={reset} />
        <h1 className="heading">Value: {count} </h1>
        <Input
          className="input"
          labelName=""
          inputType="text"
          onChange={handleInputChange}
          value={inputValue}
        />

        <Button
          type="submit"
          value="Add"
          onClick={() => performOperation("add")}
        />
        <Button
          type="submit"
          value="Subtract"
          onClick={() => performOperation("subtract")}
        />
        <Button
          type="submit"
          value="Multiply"
          onClick={() => performOperation("multiply")}
        />
        <Button
          type="submit"
          value="Divide"
          onClick={() => performOperation("divide")}
        />
      </div>
    </div>
  );
};

export default Counter;
