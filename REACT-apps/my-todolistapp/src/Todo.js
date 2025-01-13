import React, { useState, useEffect } from "react";
import "./Todo.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faCircleCheck, faPen, faTrashCan, faPlus
} from '@fortawesome/free-solid-svg-icons'

import SubtaskPopup from "./SubTask";

function Todo() {
  const [isCompletedScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  const [newPriority, setNewPriority] = useState("low");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [subTasks, setSubTasks] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [textError, setTextError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");

  const generateUniqueId = () => {
    return new Date().getTime();
  };

  const handleAddNewToDo = () => {
    if (!validateInputs()) {
      return;
    }
    if (!editMode) {
      let newTodoItem = {
        id: generateUniqueId(),
        title: newTitle,
        description: newDescription,
        priority: newPriority,
        date: newDate,
        time: newTime,
      };
      let updatedTodo = [...allTodos, newTodoItem];
      setTodos(updatedTodo);
      localStorage.setItem("todolist", JSON.stringify(updatedTodo));
      setNewTitle("");
      setNewDescription("");
      setNewPriority("low");
      setNewDate("");
      setNewTime("");
    } else {
      let updatedTodoList = [...allTodos];
      updatedTodoList[editIndex] = {
        ...updatedTodoList[editIndex],
        title: newTitle,
        description: newDescription,
        priority: newPriority,
        date: newDate,
        time: newTime,
      };
      setTodos(updatedTodoList);
      localStorage.setItem("todolist", JSON.stringify(updatedTodoList));
      setNewTitle("");
      setNewDescription("");
      setNewPriority("low");
      setNewDate("");
      setNewTime("");
      setEditMode(false);
      setEditIndex(null);
    }
  };

  const editAddedTodo = (index) => {
    let filteredTodo = { ...allTodos[index] };
    setNewTitle(filteredTodo.title);
    setNewDescription(filteredTodo.description);
    setNewPriority(filteredTodo.priority);
    setNewDate(filteredTodo.date);
    setNewTime(filteredTodo.time);
    setEditMode(true);
    setEditIndex(index);
  };

  const subTask = JSON.parse(localStorage.getItem("subTask")) || [];

  const handleFilter = (taskId) => {
    const filteredTasks = subTask.filter((task) => task.taskId === taskId);
    console.log(filteredTasks);
    return filteredTasks;
  };

  const handleItemClick = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleAddSubtask = (taskId, subTaskId) => {
    const updatedSubTasks = handleFilter(taskId).map((subItem) => {
      if (subItem.id === subTaskId) {
        return {
          ...subItem,
          status: !subItem.status,
        };
      }
      return subItem;
    });
    setSubTasks(updatedSubTasks);
    localStorage.setItem("subTask", JSON.stringify(updatedSubTasks));
  };

  const handleComplete = (index) => {
    const hasSubTasks = handleFilter(allTodos[index].id).some(
      (subTask) => !subTask.status
    );

    if (hasSubTasks) {
      alert(
        "Complete all subtasks first before marking the main task as complete."
      );
      return;
    }

    const date = new Date();
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const finalDate = `${dd}-${mm}-${yyyy} ${hours}:${minutes}:${seconds}`;

    let filteredTodo = {
      ...allTodos[index],
      completedOn: finalDate,
    };

    let updatedCompletedList = [...completedTodos, filteredTodo];
    setCompletedTodos(updatedCompletedList);
    localStorage.setItem(
      "completedTodos",
      JSON.stringify(updatedCompletedList)
    );
    deletedOnlyTask(index);
  };

  const deletedOnlyTask = (index) => {
    let reducedTodos = [...allTodos];
    reducedTodos.splice(index, 1);

    localStorage.setItem("todolist", JSON.stringify(reducedTodos));
    setTodos(reducedTodos);
  };

  const deletedAddedTodo = (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task and its sub task?"
    );
    if (!confirmed) {
      return;
    }

    let reducedTodos = [...allTodos];
    const deletedTodo = reducedTodos.splice(index, 1)[0];
    const updatedSubTasks = subTask.filter(
      (subItem) => subItem.taskId !== deletedTodo.id
    );
    localStorage.setItem("subTask", JSON.stringify(updatedSubTasks));

    localStorage.setItem("todolist", JSON.stringify(reducedTodos));
    setTodos(reducedTodos);
  };

  const deletedCompletedTodo = (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this completed task and its sub task?"
    );
    if (!confirmed) {
      return;
    }

    let reducedCompletedTodos = [...completedTodos];
    const deletedCompletedTodo = reducedCompletedTodos.splice(index, 1)[0];

    const updatedSubTasks = subTask.filter(
      (subItem) => subItem.taskId !== deletedCompletedTodo.id
    );
    localStorage.setItem("subTask", JSON.stringify(updatedSubTasks));

    localStorage.setItem(
      "completedTodos",
      JSON.stringify(reducedCompletedTodos)
    );
    setCompletedTodos(reducedCompletedTodos);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodos = JSON.parse(
      localStorage.getItem("completedTodos")
    );

    if (savedTodo) {
      setTodos(savedTodo);
    }

    if (savedCompletedTodos) {
      setCompletedTodos(savedCompletedTodos);
    }
  }, []);

  const validateInputs = () => {
    const trimmedTitle = newTitle.trim();
    if (trimmedTitle.length < 4) {
      setTextError("Title should be at least 4 characters long.");
      return false;
    }

    const trimmedDescription = newDescription.trim();
    if (trimmedDescription.length < 4) {
      setDescriptionError("Description should be at least 4 characters long.");
      return false;
    }
    setTextError("");
    setDescriptionError("");
    return true;
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);

    if (selectedDate >= today && selectedDate <= nextYear) {
      setNewDate(e.target.value);
      setDateError("");
    } else {
      setDateError("Please select a date within the next 365 days.");
    }
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const selectedDateTime = new Date(`${newDate}T${selectedTime}`);
    const currentDateTime = new Date();

    if (
      selectedDateTime > currentDateTime ||
      newDate !== currentDateTime.toISOString().split("T")[0]
    ) {
      setNewTime(e.target.value);
      setTimeError("");
    } else {
      setTimeError("Please select a time equal to or after the current time.");
    }
  };

  return (
    <div className="App">
      <div className="div-wrapper">
        <div className="todo-wrapper">
          <div className="todo-input-item">
            <label>Title:</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the title of your To Do?"
            />
            <div className="error-message">{textError}</div>
          </div>

          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the title of your To Do?"
            />
            <div className="error-message">{descriptionError}</div>
          </div>
        </div>
        <div className="todo-wrapper">
          <div className="todo-input-item">
            <label>Priority:</label>
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="todo-input-item">
            <label>Date:</label>
            <input
              type="date"
              value={newDate}
              onChange={handleDateChange}
              min={new Date().toISOString().split("T")[0]}
              max={(new Date().getFullYear() + 1).toString() + "-12-31"}
            />
            <div className="error-message">{dateError}</div>
          </div>

          <div className="todo-input-item">
            <label>Time:</label>
            <input type="time" value={newTime} onChange={handleTimeChange} />
            <div className="error-message">{timeError}</div>
          </div>

          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddNewToDo}
              className="primaryBtn"
            >
              {editMode ? "Update" : "Add"}
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${
              isCompletedScreen === false && "active"
            }`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompletedScreen === false &&
            allTodos
              .sort((a, b) => {
                const priorityOrder = { high: 1, medium: 2, low: 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
              })
              .map((item, index) => (
                <div className="todo-list-div">
                  <div
                    className="todo-list-item"
                    onClick={() => handleItemClick(index)}
                  >
                    <div>
                      <h3 className="todoh3">{item.title}</h3>
                      <div className="flexTodo">
                        <p>
                          {item.description} - {item.priority}{" "}
                        </p>
                      </div>
                      <div className="dateDiv">
                        <p>
                          Date : {item.date} - {item.time}{" "}
                        </p>
                      </div>
                    </div>
                    <div>
                    <FontAwesomeIcon icon={faPlus} 
                        title="Add?"
                        className="sub-task-icon"
                        onClick={() => setShowPopup(true)}
                      />
                      {showPopup && (
                        <SubtaskPopup
                          taskId={item.id}
                          onClose={() => setShowPopup(false)}
                        />
                      )}
                      <FontAwesomeIcon icon={faPen} 
                        title="Edit?"
                        className="edit-icon"
                        onClick={() => editAddedTodo(index)}
                      />
                      <FontAwesomeIcon icon={faTrashCan} 
                        title="Delete?"
                        className="icon"
                        onClick={() => deletedAddedTodo(index)}
                      />
                      <FontAwesomeIcon icon={faCircleCheck} 
                        title="Completed?"
                        className="check-icon"
                        onClick={() => handleComplete(index)}
                      />
                    </div>
                  </div>
                  <div className="listDiv">
                    {expandedIndex === index && (
                      <ul>
                        {handleFilter(item.id).map((subItem, subIndex) => (
                          <li className="list" key={subIndex}>
                            <div className="flexTodoPara">
                              <h3 className="ulh3">{subItem.title}</h3>
                              <div className="flexTodoPara">
                                <input
                                  className="inputBox"
                                  type="checkbox"
                                  checked={subItem.status === true}
                                  disabled={subItem.status === true}
                                  onChange={() =>
                                    handleAddSubtask(item.id, subItem.id)
                                  }
                                />
                              </div>
                            </div>
                            <div className="flexTodoPara">
                              <p className="flexPara">{subItem.description}</p>
                              <p className="flexPara"> - {subItem.priority}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
          {isCompletedScreen &&
            completedTodos.length > 0 &&
            completedTodos.map((item, index) => (
              <div
                className={`todo-list-div ${
                  expandedIndex === index ? "expanded" : ""
                }`}
                onClick={() => handleItemClick(index)}
                key={index}
              >
                <div class="flexTodo">
                  <div>
                    <h3 className="todoh3">{item.title}</h3>
                    <div className="flexTodo">
                      <p>
                        {item.description} - {item.priority}{" "}
                      </p>
                    </div>
                    <div className="dateDiv">
                      <p>Date: {item.completedOn} </p>
                    </div>
                  </div>
                  <div>
                    <faTrashCan
                      className="icon"
                      onClick={() => deletedCompletedTodo(index)}
                    />
                  </div>
                </div>
                <ul>
                  {expandedIndex === index &&
                    handleFilter(item.id).map((subItem, subIndex) => (
                      <li className="list" key={subIndex}>
                        <div className="flexTodoPara">
                          <h3 className="ulh3">{subItem.title}</h3>
                          <div className="flexTodoPara">
                            <input
                              className="inputBox"
                              type="checkbox"
                              checked={subItem.status === true}
                              disabled={subItem.status === true}
                              onChange={() =>
                                handleAddSubtask(item.id, subItem.id)
                              }
                            />
                          </div>
                        </div>
                        <div className="flexTodoPara">
                          <p className="flexPara">{subItem.description}</p>
                          <p className="flexPara"> - {subItem.priority}</p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Todo;
