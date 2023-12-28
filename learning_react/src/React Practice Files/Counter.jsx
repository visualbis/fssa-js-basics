// import React, { useState } from 'react';

// const Counter = () => {
//   const [count, setCount] = useState(0);

//   const add = () => {
//     setCount(count + 1);
//   };

//   const subtract = () => {
//     setCount(count - 1);
//   };

//   const multiply = () => {
//     setCount(count * 2);
//   }

//   const divide = () => {
//     setCount(count / 2);
//   }

//   return (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={add}>Add + 1</button>
//       <button onClick={subtract}>Subtract - 1</button>
//       <button onClick={multiply}>Multiply * 2</button>
//       <button onClick={divide}>Divide / 2</button>
//     </div>
//   );
// };

// export default Counter;

import React, { useState } from 'react';

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
    <div>
      <h1>Count: {count}</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a number"
      />
      <button onClick={() => performOperation('add')}>Add +</button>
      <button onClick={() => performOperation('subtract')}>Subtract -</button>
      <button onClick={() => performOperation('multiply')}>Multiply *</button>
      <button onClick={() => performOperation('divide')}>Divide /</button>
    </div>
  );
};

export default Counter;

