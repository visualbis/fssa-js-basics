import React from 'react'
import { useState } from 'react'
import './todo.css';

function TodoList () {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

function handleChange(e){
  setInputValue(e.target.value)
}

function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      text: inputValue,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  }


function removeTask(targetId) {
    const updatedTodos = todos.filter(todo => todo.id !== targetId);
    setTodos(updatedTodos);
}

  return (
    <div className='conatiner'>
      <h2>Todo List</h2>
      <form class="inputSection">
        <input type='text' value={inputValue} onChange={handleChange}/>
        <button onClick={handleSubmit}>Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
          {todo.text}
           <button onClick={() => removeTask(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList