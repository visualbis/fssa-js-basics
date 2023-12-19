import React, { useState, useEffect } from "react";
import "./Todo.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function Todo() {
  const [isCompletedScreen, setIsCompleteScreen] = useState(false); 
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddNewToDo = () => {
    if (!editMode) {
      let newTodoItem = {
        title: newTitle,
        description: newDescription,
      };
      let updatedTodo = [...allTodos, newTodoItem];
      setTodos(updatedTodo);
      localStorage.setItem('todolist', JSON.stringify(updatedTodo));
      setNewTitle('');
      setNewDescription('');
    } else {
      let updatedTodoList = [...allTodos];
      updatedTodoList[editIndex] = {
        ...updatedTodoList[editIndex],
        title: newTitle,
        description: newDescription,
      };
      setTodos(updatedTodoList);
      localStorage.setItem('todolist', JSON.stringify(updatedTodoList));
      setNewTitle('');
      setNewDescription('');
      setEditMode(false);
      setEditIndex(null);
    }
  };

  const editAddedTodo = (index) => {
    let filteredTodo = { ...allTodos[index] };
    setNewTitle(filteredTodo.title);
    setNewDescription(filteredTodo.description);
    setEditMode(true);
    setEditIndex(index);
  };


  const handleComplete = (index) => {
    const date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var finalDate = dd + "-" + mm + "-" + yyyy;

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
          <button
              type="button"
              onClick={handleAddNewToDo}
              className="primaryBtn"
            >
              {editMode ? 'Update' : 'Add'}
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
            allTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
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
                    className=" check-icon"
                    onClick={() => handleComplete(index)}
                  />
                </div>
              </div>
            ))}

          {isCompletedScreen === true &&
            completedTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>
                    {" "}
                    <i>Completed at: {item.completedOn}</i>
                  </p>
                </div>
                <div>
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
