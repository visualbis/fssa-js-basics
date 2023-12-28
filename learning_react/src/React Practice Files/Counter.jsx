import React, { useState } from 'react';
import '../React Practice CSS files/Counter.css';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const performOperation = (operation) => {
    const inputValueAsNumber = parseFloat(inputValue);

    if (!isNaN(inputValueAsNumber)) {
      switch (operation) {
        case 'add':
          setCount(count + inputValueAsNumber);
          break;
        case 'subtract':
          setCount(count - inputValueAsNumber);
          break;
        case 'multiply':
          setCount(count * inputValueAsNumber);
          break;
        case 'divide':
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
    <div className="container">
      <h1 className="heading">Value: {count}</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="input"
        placeholder="Enter a number"
      />
      <button className="button" onClick={() => performOperation('add')}>Add</button>
      <button className="button" onClick={() => performOperation('subtract')}>Subtract</button>
      <button className="button" onClick={() => performOperation('multiply')}>Multiply</button>
      <button className="button" onClick={() => performOperation('divide')}>Divide</button>
    </div>
  );
};

export default Counter;
