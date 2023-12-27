import React, { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import Today from "./components/TodayList";
import TodoList from './components/TodoList';
import Popup from './components/Popup'

function App() {

  const [tasks , setTasks ] = useState([]);
  const [isPopupActive, setPopupActive] = useState(true);


  const addTask = (newTask)=>{
    setTasks([newTask,...tasks]);
    console.log(tasks);
  }


  const togglePopup = () => {
    setPopupActive(!isPopupActive);
  };

  return (
    <>
      <div className="app-container" >
        <div className="left-side">
          <TodoForm togglePopup={togglePopup} />
          <Today tasks={tasks} />
        </div>

        <div className="right-side">
          <TodoList />
        </div>
        {isPopupActive && <Popup onClose={togglePopup} onAddTask={addTask}/>}
      </div>
    </>

  )
}

export default App;
