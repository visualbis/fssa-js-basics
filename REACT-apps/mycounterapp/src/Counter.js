import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Import the close icon
import './App.css';

const Counter = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [state, setState] = useState({
    count: 0,
    step: 1,
  });

  const handleStepChange = ({ target }) => {
    setState((prevState) => ({
      ...prevState,
      step: Number(target.value),
    }));
  };

  const trigger = (operation) => () => {
    const inputNumber = state.step;
    let newCount = 0;
    if (operation === 'plus') {
      newCount = state.count + inputNumber;
    } else {
      newCount = state.count - inputNumber;
    }
    if (newCount < 0) {
      setErrorMessage('Result cannot be negative');
    } else {
      setState((prevState) => ({
        ...prevState,
        count: newCount,
      }));
      setErrorMessage('');
    }
  };

  const handleClosePopup = () => {
    setErrorMessage('');
  };

  return (
    <>
      <div className='container'>
        <div className='counter'>
          <h1>
            ReactJS <span className='subtext'>counter</span>
          </h1>
          <span className='result'>{state.count}</span>
          <br />
          <button type='button' onClick={trigger('plus')}>
            + {state.step}
            <br />
            Increment
          </button>
          <button type='button' onClick={trigger('subtract')}>
            - {state.step}
            <br />
            Decrement
          </button>
          <div className='step'>
            Change the count here{' '}
            <span style={{ fontSize: '150%', color: '#1d99ef' }}>↓</span> :
          </div>
          <input
            type='number'
            placeholder='Type the Values...'
            min='0'
            onChange={handleStepChange}
          />
        </div>
      </div>
      {errorMessage && (
        <p className='error'>
          {errorMessage}
          <AiOutlineClose className='close-icon' onClick={handleClosePopup} />
        </p>
      )}
    </>
  );
};

export default Counter;
