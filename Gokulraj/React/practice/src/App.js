import React, { useState } from 'react';
import './App.css';

function App() {

  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(0);



  function addTask(e) {
    e.preventDefault();

    if (editId) {
      const editTask = tasks.find((oneTask) => oneTask.id === editId);

      const update = tasks.map((row) => row.id === editTask.id ? row = { id: row.id, "taskName": newTask } : { id: row.id, "taskName": row.taskName })

      setTasks(update)
      setNewTask("");
      setEditId(0);
      return;
    }


    if (newTask.trim() !== "") {
      setTasks([{ id: tasks.length + 1, "taskName": newTask }, ...tasks]);
      setNewTask("");
    }
  }

  function deleteTask(id) {
    const del = tasks.filter((oneTask) => oneTask.id !== id);
    setTasks([...del]);
    setNewTask("");
    return;
  }

  function updateTask(id) {
    const update = tasks.find((taskid) => taskid.id === id);
    setNewTask(update.taskName);
    setEditId(id);



  }

  return (
    <div className="all">
      <div className='head'>

        <h3 className="title">Add a New Task!</h3>

        <form onSubmit={addTask}>
          <input type='text' value={newTask} onChange={(e) => setNewTask(e.target.value)}></input>
          <button type='submit'> {editId ? "Edit" : "Add"} </button>
        </form>


      </div>
      
      <div className='todo-list'>
        <ul>
          {tasks.map((t) => (
            <li className='single-todo' key={t.id}>
              <span key={t.id}>
                {t.taskName}
              </span>
              <button onClick={() => updateTask(t.id)}>Edit</button>
              <button onClick={() => deleteTask(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default App;
