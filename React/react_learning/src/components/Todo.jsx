import React, { useState } from "react";
import "../css/Todo.css";

const ToDo = () => {
  const [taskArr, setTaskArr] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskType, setTaskType] = useState("Low");
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Add task function
  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }

    const newTaskObj = {
      id: Date.now(),
      task: newTask,
      type: taskType,
    };

    setTaskArr([...taskArr, newTaskObj]);
    setNewTask("");
  };

  // Start editing task
  const startEditingTask = (taskId) => {
    setEditingTaskId(taskId);
  };

  // Save edited task
  const saveEditedTask = (taskId, editedTask, editedType) => {
    const updatedTasks = taskArr.map((item) => {
      if (item.id === taskId) {
        return {
          ...item,
          task: editedTask,
          type: editedType,
        };
      }
      return item;
    });

    setTaskArr(updatedTasks);
    setEditingTaskId(null);
  };

  // Remove task function
  const removeTask = (taskId) => {
    const updatedTasks = taskArr.filter((item) => item.id !== taskId);
    setTaskArr(updatedTasks);
  };

  return (
    <div className="task-div-container">
      <div className="todo-head-div">
        <h1 className="todo-head">Todo</h1>
      </div>
      <div className="task-add-div-container">
        <label for="taskInput">Task</label>
        <input
          type="text"
          id="taskInput"
          name="taskInput"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <label htmlFor="task">Task type</label>
        <select
          name="task"
          id="cars"
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
        >
          <option value="Low" style={{ color: "green" }}>
            Low
          </option>
          <option value="Medium" style={{ color: "orange" }}>
            Medium
          </option>
          <option value="High" style={{ color: "red" }}>
            High
          </option>
        </select>

        <button onClick={addTask} className="add-task-button">
          <i className="bi bi-calendar-plus"></i>
          Add Task
        </button>
      </div>
      <div className="task-showing-div-container">
        <div className="task-showing-div">
          {taskArr.map((item) => (
            <div key={item.id} className="task-div">
              {editingTaskId === item.id ? (
                <div>
                  <input
                    type="text"
                    value={item.task}
                    onChange={(e) => {
                      const updatedTasks = taskArr.map((t) =>
                        t.id === item.id ? { ...t, task: e.target.value } : t
                      );
                      setTaskArr(updatedTasks);
                    }}
                  />
                  <select
                    value={item.type}
                    onChange={(e) => {
                      const updatedTasks = taskArr.map((t) =>
                        t.id === item.id ? { ...t, type: e.target.value } : t
                      );
                      setTaskArr(updatedTasks);
                    }}
                  >
                    <option value="Low" style={{ color: "green" }}>
                      Low
                    </option>
                    <option value="Medium" style={{ color: "orange" }}>
                      Medium
                    </option>
                    <option value="High" style={{ color: "red" }}>
                      High
                    </option>
                  </select>
                  <button
                    onClick={() =>
                      saveEditedTask(item.id, item.task, item.type)
                    }
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="task-list-div-container">
                  <div className="each-task-div">
                    <p className="task-para">{item.task}</p>
                    <p className="task-tape-showing-div">{item.type}</p>
                    <button
                      className="update-task-button"
                      onClick={() => startEditingTask(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeTask(item.id)}
                      className="task-remove-button"
                    >
                      <i className="bi bi-calendar2-x"></i>
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ToDo };
