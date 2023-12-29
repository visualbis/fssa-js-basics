import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import Today from "./components/TodayList";
import TodoList from './components/TodoList';
import Popup from './components/Popup'
import SubTask from './components/SubTask';

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
  const [isPopupActiveTask, setPopupActiveTask] = useState(false);
  const [subTaskId, setSubTaskId] = useState(0);
  const [subTask, setSubTask] = useState([]);
  const [editTask, setEditTask] = useState(null);


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // console.log("completed")
  }, [tasks]);

  const setSubTasks = (id) => {
    const task = tasks.find((task) => task.id === id);
    setSubTask(task ? task.subTasks : []);
  };

  const togglePopup = () => {
    setNewTask({
      taskName: '',
      description: '',
      priority: 'high',
      dueDate: '',
      status: false,
      subTasks: [],
    });
    setEditTask(null);
    setPopupActive(!isPopupActive);
  };

  const togglePopupTask = (newId) => {
    setSubTaskId(newId);
    setSubTasks(newId);
    setPopupActiveTask(!isPopupActiveTask);
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

      togglePopup();

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
      togglePopup();
    }
  };

  const deleteTask = (id) => {
    const del = tasks.filter((oneTask) => oneTask.id !== id);
    setTasks([...del]);
    return;
  }


  const updateTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);

    togglePopup();

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


  const updateStatus = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: !task.status } : task
    );

    setTasks(updatedTasks);
  };

  return (
    <>


      <div className="app-container" >
        <div className="left-side">
          <TodoForm togglePopup={togglePopup} />
          <Today togglePopupTask={togglePopupTask} tasks={tasks}
            updateTask={updateTask} deleteTask={deleteTask} updateStatus={updateStatus} />
        </div>

        <div className="right-side">
          <TodoList />
        </div>

        {isPopupActive && <Popup onClose={togglePopup} addTask={addTask}
          handleInputChange={handleInputChange}
          handleSubTaskChange={handleSubTaskChange}
          newTask={newTask}
          addSubTask={addSubTask} />}

        {isPopupActiveTask && <SubTask onClose={togglePopupTask} subTask={subTask} onDelete={deleteSubTask} taskId={subTaskId} />}
      </div>
    </>

  )
}

export default App;
