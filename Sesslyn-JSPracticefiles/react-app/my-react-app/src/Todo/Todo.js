import React, { useState, useEffect } from "react";
import "./Todo.css";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
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

  const generateUniqueId = () => {
    return new Date().getTime();
  };

  const handleAddNewToDo = () => {
    if (!editMode) {
      let newTodoItem = {
        id: generateUniqueId(),
        title: newTitle,
        description: newDescription,
        priority: newPriority,
      };
      let updatedTodo = [...allTodos, newTodoItem];
      setTodos(updatedTodo);
      localStorage.setItem("todolist", JSON.stringify(updatedTodo));
      setNewTitle("");
      setNewDescription("");
      setNewPriority("low");
    } else {
      let updatedTodoList = [...allTodos];
      updatedTodoList[editIndex] = {
        ...updatedTodoList[editIndex],
        title: newTitle,
        description: newDescription,
        priority: newPriority,
      };
      setTodos(updatedTodoList);
      localStorage.setItem("todolist", JSON.stringify(updatedTodoList));
      setNewTitle("");
      setNewDescription("");
      setNewPriority("low");
      setEditMode(false);
      setEditIndex(null);
    }
  };

  const editAddedTodo = (index) => {
    let filteredTodo = { ...allTodos[index] };
    setNewTitle(filteredTodo.title);
    setNewDescription(filteredTodo.description);
    setNewPriority(filteredTodo.priority);
    setEditMode(true);
    setEditIndex(index);
  };

  const handleComplete = (index) => {
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
    deletedAddedTodo(index);
  };

  const deletedAddedTodo = (index) => {
    let reducedTodos = [...allTodos];
    reducedTodos.splice(index, 1);

    localStorage.setItem("todolist", JSON.stringify(reducedTodos));
    setTodos(reducedTodos);
  };

  const deletedCompletedTodo = (index) => {
    let reducedCompletedTodos = [...completedTodos];
    reducedCompletedTodos.splice(index);
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
          </div>

          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the title of your To Do?"
            />
          </div>

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
                        <p>{item.description} </p>
                        <p className="priority"> - {item.priority} </p>
                      </div>
                    </div>
                    <div>
                      <AiOutlinePlus
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
                      <AiOutlineEdit
                        title="Edit?"
                        className="edit-icon"
                        onClick={() => editAddedTodo(index)}
                      />
                      <AiOutlineDelete
                        title="Delete?"
                        className="icon"
                        onClick={() => deletedAddedTodo(index)}
                      />
                      <BsCheckLg
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
          {isCompletedScreen === true &&
            completedTodos
              .sort((a, b) => {
                const priorityOrder = { high: 1, medium: 2, low: 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
              })
              .map((item, index) => (
                <div className="todo-list-div" key={index}>
                  <h3 className="todoh3">{item.title}</h3>
                  <div className="flexTodo">
                    <p>{item.description}</p>
                    <p>Completed at: {item.completedOn} </p>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => deletedCompletedTodo(index)}
                    />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Todo;
