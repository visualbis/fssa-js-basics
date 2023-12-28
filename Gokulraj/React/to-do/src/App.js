import React, { useState,useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import Today from "./components/TodayList";
import TodoList from './components/TodoList';
import Popup from './components/Popup'

function App() {

  const storedData = JSON.parse(localStorage.getItem("tasks")) || [];

  const [newTask, setNewTask] = useState({
    taskName: '',
    description: '',
    priority: 'high',
    dueDate: '',
    status: false,
    subTasks: [],
  });

  const [tasks, setTasks] = useState(storedData);
  const [isPopupActive, setPopupActive] = useState(false);
  const [subTaskId, setSubTaskId] = useState(0);
  const [subTask, setSubTask] = useState([]);
  const [editTask, setEditTask] = useState(null);


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("completed")
  }, [tasks]);

  const setSubTasks = (id) => {
    const task = tasks.find((task) => task.id === id);
    setSubTask(task ? task.subTasks : []);
  };

  const togglePopup = (newId) => {
    setSubTaskId(newId);
    setSubTasks(newId);
    setPopupActive(!isPopupActive);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubTaskChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSubTasks = [...newTask.subTasks];
    updatedSubTasks[index][name] = value;
    setNewTask((prevData) => ({
      ...prevData,
      subTasks: updatedSubTasks,
    }));
  };

  const addSubTask = () => {
    const updatedSubTasks = [...newTask.subTasks, { id: Date.now(), title: '', status: false }];
    setNewTask((prevData) => ({ ...prevData, subTasks: updatedSubTasks }));
  };

  const addTask = (e) => {
    e.preventDefault();

    if (editTask) {
      const updatedTasks = tasks.map((task) => (task.id === editTask.id ? newTask : task));
      setTasks(updatedTasks);
      setEditTask(null);
      setNewTask({
        taskName: '',
        description: '',
        priority: 'high',
        dueDate: '',
        status: false,
        subTasks: [],
      })

    } else {


      const newTasks = {
        id: Date.now(),
        taskName: newTask.taskName,
        description: newTask.description,
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        status: false,
        subTasks: newTask.subTasks,
      };
      setTasks((prevTasks) => [newTasks, ...prevTasks]);
      setNewTask({
        taskName: '',
        description: '',
        priority: 'high',
        dueDate: '',
        status: false,
        subTasks: [],
      });
    }
  };

  const deleteTask = (id) => {
    const del = tasks.filter((oneTask) => oneTask.id !== id);
    setTasks([...del]);
    return;
  }


  const updateTask = (id) => {
    // Find the task with the given ID and set it in the newTask state for editing
    const taskToEdit = tasks.find((task) => task.id === id);

    if (taskToEdit) {
      setNewTask({
        taskName: taskToEdit.taskName,
        description: taskToEdit.description,
        priority: taskToEdit.priority,
        dueDate: taskToEdit.dueDate,
        status: taskToEdit.status,
        subTasks: taskToEdit.subTasks,
      });
      setEditTask(taskToEdit);
    }
  }

  const deleteSubTask = (subTaskId, taskId) => {
    let updatedSubTasks;
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        updatedSubTasks = task.subTasks.filter((subTask) => subTask.id !== subTaskId);
        return { ...task, subTasks: updatedSubTasks };
      }
      return task;
    });
    setTasks(updatedTasks);
    setSubTask(updatedSubTasks);
  };





  return (
    <>


      <div className="app-container" >
        <div className="left-side">
          <TodoForm togglePopup={togglePopup} />
          <Today togglePopup={togglePopup} tasks={tasks} />
        </div>

        <div className="right-side">
          <TodoList />
        </div>
        {isPopupActive && <Popup onClose={togglePopup} addTask={addTask}
          handleInputChange={handleInputChange}
          handleSubTaskChange={handleSubTaskChange}
          newTask={newTask}
          addSubTask={addSubTask} />}
      </div>
    </>

  )
}

export default App;
