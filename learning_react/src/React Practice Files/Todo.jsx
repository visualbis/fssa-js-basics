import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newPriority, setNewPriority] = useState("medium");
  const [newTask, setNewTask] = useState("Meeting");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [filterTask, setFilterTask] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
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
      // Add the new task name to the set
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
          completed: false,
          date: new Date().toLocaleString(),
        },
      ]);
      setNewTodo("");
      setNewPriority("medium");
      setNewTask("Meeting");
      setNewTaskName("");
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
    const priorityFilter =
      filterPriority === "all" || todo.priority === filterPriority;

    return taskFilter && priorityFilter;
  });

  return (
    <div>
      <h1>Todo App</h1>

      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New Todo"
        />

        <div>
          <select
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          >
            {uniqueTaskOptions}
          </select>
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <button onClick={addNewTaskName}>+</button>
        </div>

        <select value={newTask} onChange={(e) => setNewTask(e.target.value)}>
          <option value="meeting">Meeting</option>
          <option value="exercise">Exercise</option>
          <option value="entertainment">Entertainment</option>
          <option value="sports">Sports</option>
          <option value="learning">Learning</option>
        </select>

        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
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
            <option value="Meeting">Meeting</option>
            <option value="exercise">Exercise</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports</option>
            <option value="learning">Learning</option>
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
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {editTodoId === todo.id ? (
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
            ) : (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color:
                    todo.priority === "high"
                      ? "red"
                      : todo.priority === "medium"
                      ? "orange"
                      : "green",
                }}
              >
                {todo.text} (Priority: {todo.priority}, #{todo.taskName}, #
                {todo.task})
              </span>
            )}
            {todo.completed ? (
              <span>Completed</span>
            ) : (
              <>
                <button onClick={() => removeTodo(todo.id)}>Remove</button>
                {editTodoId === todo.id ? (
                  <>
                    <button onClick={() => saveEdit(todo.id)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => startEdit(todo.id, todo.text)}>
                    Edit
                  </button>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
