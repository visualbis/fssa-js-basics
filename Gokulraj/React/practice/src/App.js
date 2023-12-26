import React, { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import Today from "./components/TodayList";
import TodoList from './components/TodoList';
// import Popup from './components/Popup'

function App() {
  return (
    <>    <div className="app-container" >
      <div className="left-side">
        <TodoForm />
        <Today />
      </div>

      <div className="right-side">
        <TodoList />
      </div>
    </div>
    </>

  )
}

export default App;
