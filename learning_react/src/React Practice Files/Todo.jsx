import React, { useState, useEffect } from "react";
import "../React Practice CSS files/Todo.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newPriority, setNewPriority] = useState("medium");
  const [newDueDate, setNewDueDate] = useState("");
  const [newTask, setNewTask] = useState("Meeting");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [filterTask, setFilterTask] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterCompleted, setFilterCompleted] = useState("all");
  const [newTaskName, setNewTaskName] = useState("");
  const [uniqueTaskNames, setUniqueTaskNames] = useState([]);

  const uniqueTaskOptions = uniqueTaskNames.map((taskName) => (
    <option key={taskName} value={taskName}>
      {taskName}
    </option>
  ));

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
    const uniqueNames = Array.from(
      new Set(storedTodos.map((todo) => todo.taskName))
    );
    setUniqueTaskNames(uniqueNames);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addNewTaskName = (event) => {
    event.preventDefault();

    if (newTaskName.trim() !== "" && !uniqueTaskNames.includes(newTaskName)) {
      setUniqueTaskNames((prevTaskNames) => [...prevTaskNames, newTaskName]);
      setNewTaskName("");
    }
  };

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo,
          priority: newPriority,
          task: newTask,
          taskName: newTaskName,
          dueDate: newDueDate,
          completed: false,
          date: new Date().toLocaleString(),
        },
      ]);
      setNewTodo("");
      setNewPriority("medium");
      setNewTask("Meeting");
      setNewTaskName("");
      setNewDueDate("");
    }
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const startEdit = (id, text) => {
    setEditTodoId(id);
    setEditedText(text);
  };

  const cancelEdit = () => {
    setEditTodoId(null);
    setEditedText("");
  };

  const saveEdit = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: editedText } : todo
      )
    );
    setEditTodoId(null);
    setEditedText("");
  };

  const filteredTodos = todos.filter((todo) => {
    const taskFilter = filterTask === "all" || todo.task === filterTask;
    const CategoryFilter =
      filterCategory === "all" || todo.taskName === filterCategory;

    const priorityFilter =
      filterPriority === "all" || todo.priority === filterPriority;

    const completedFilter =
      filterCompleted === "all" || todo.completed === filterCompleted;

    return taskFilter && CategoryFilter && priorityFilter && completedFilter;
  });

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="todo-app-container">
      <h1>Welcome to Your Tasks</h1>

      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New Todo"
        />

        {/* Main task input */}
        <select value={newTask} onChange={(e) => setNewTask(e.target.value)}>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="home">Home</option>
          <option value="meeting">Meeting</option>
          <option value="school">School</option>
          <option value="learning">Learning</option>
          <option value="project">Project</option>
          <option value="sports">Sports</option>
          <option value="exercise">Exercise</option>
          <option value="fitness">Fitness</option>
          <option value="event">Event / Function</option>
          <option value="travel">Travel</option>
          <option value="entertainment">Entertainment</option>
        </select>

        <select
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        >
          <option value="Select Sub Category here">
            Select Sub Category here
          </option>
          {uniqueTaskOptions}
        </select>
        <input
          type="text"
          // value={newTaskName}
          placeholder="Add new Sub Category here"
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <button onClick={addNewTaskName}>+</button>

        {/* Priority input */}
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* Due Date input */}
        <label>
          Due Date:
          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            min={getCurrentDate()}
          />
        </label>

        <button onClick={addTodo}>Add Todo</button>
      </div>

      {/* Filter controls */}
      <div>
        <label>
          Filter by Task:
          <select
            value={filterTask}
            onChange={(e) => setFilterTask(e.target.value)}
          >
            <option value="all">All</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="home">Home</option>
            <option value="meeting">Meeting</option>
            <option value="school">School</option>
            <option value="learning">Learning</option>
            <option value="project">Project</option>
            <option value="sports">Sports</option>
            <option value="exercise">Exercise</option>
            <option value="fitness">Fitness</option>
            <option value="event">Event / Function</option>
            <option value="travel">Travel</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </label>

        <label>
          Filter by Category:
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All</option>
            {uniqueTaskOptions}
          </select>
        </label>

        <label>
          Filter by Priority:
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label>
          Filter by Completion Status:
          <select
            value={filterCompleted}
            onChange={(e) => setFilterCompleted(e.target.value)}
          >
            <option value="all">All</option>
            <option value="1">Completed</option>
            <option value="0">Yet to Completed</option>
          </select>
        </label>
      </div>

      {/* table for stored values */}

      <table className="todo-table">
        <thead>
          <tr>
            <th>Completed</th>
            <th>Task</th>
            <th>Priority</th>
            <th>Category</th>
            <th>Sub-Category</th>
            <th>Last Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-todos-message">
                You haven't added any todos.
              </td>
            </tr>
          ) : (
            filteredTodos.map((todo) => (
              <tr key={todo.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                </td>
                <td>
                  {editTodoId === todo.id ? (
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />
                  ) : (
                    <span
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                        color:
                          todo.priority === "high"
                            ? "red"
                            : todo.priority === "medium"
                            ? "orange"
                            : "green",
                      }}
                    >
                      {todo.text}
                    </span>
                  )}
                </td>
                <td
                  style={{
                    color:
                      todo.priority === "high"
                        ? "red"
                        : todo.priority === "medium"
                        ? "orange"
                        : "green",
                  }}
                >
                  {todo.priority === "high"
                    ? "High"
                    : todo.priority === "medium"
                    ? "Medium"
                    : "Low"}
                </td>
                <td
                  style={{
                    color:
                      todo.priority === "high"
                        ? "red"
                        : todo.priority === "medium"
                        ? "orange"
                        : "green",
                  }}
                >
                  #{todo.task}
                </td>
                <td
                  style={{
                    color:
                      todo.priority === "high"
                        ? "red"
                        : todo.priority === "medium"
                        ? "orange"
                        : "green",
                  }}
                >
                  #{todo.taskName}
                </td>
                <td>{todo.dueDate}</td>
                <td>
                  {todo.completed ? (
                    <button className="completed">Completed</button>
                  ) : (
                    <>
                      <button onClick={() => removeTodo(todo.id)}>
                        Remove
                      </button>
                      {editTodoId === todo.id ? (
                        <>
                          <button onClick={() => saveEdit(todo.id)}>
                            Save
                          </button>
                          <button onClick={cancelEdit}>Cancel</button>
                        </>
                      ) : (
                        <button onClick={() => startEdit(todo.id, todo.text)}>
                          Edit
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodoApp;
