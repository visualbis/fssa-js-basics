import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [status, setStatus] = useState("pending");
  const [category, setCategory] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Load tasks from local storage on component mount
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever tasks change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "" || category.trim() === "") return;

    if (editIndex !== null) {
      // Edit existing task
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = { task, startDate, endDate, status, category };
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      // Add new task
      setTasks([...tasks, { task, startDate, endDate, status, category }]);
    }

    // Clear form fields
    setTask("");
    setStartDate(new Date());
    setEndDate(new Date());
    setStatus("pending");
    setCategory(""); // Clear category field
  };

  const editTask = (index) => {
    const { task, startDate, endDate, status, category } = tasks[index];
    setTask(task);
    setStartDate(new Date(startDate));
    setEndDate(new Date(endDate));
    setStatus(status);
    setCategory(category);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <label>Task:</label>
        <input
          type="text"
          placeholder="task name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          placeholder="category name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div>
        <label>End Date:</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button onClick={addTask}>
        {editIndex !== null ? "Update Task" : "Add Task"}
      </button>
      <div>
        <button onClick={() => setSelectedCategory("All")}>All</button>
        <button onClick={() => setSelectedCategory("Personal")}>Category1</button>
        <button onClick={() => setSelectedCategory("Category2")}>Category2</button>
        {/* Add more buttons for other categories as needed */}
      </div>
      <ul>
        {tasks
          .filter((t) => selectedCategory === "All" || t.category === selectedCategory)
          .map((t, index) => (
            <li key={index}>
              {t.task} | Category: {t.category} | Start Date: {t.startDate.toDateString()} | End Date:{" "}
              {t.endDate.toDateString()} | Status: {t.status}
              <button onClick={() => editTask(index)}>Edit</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
