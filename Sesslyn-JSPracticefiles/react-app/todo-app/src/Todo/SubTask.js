import React, { useState } from "react";
import "./SubTask.css";
import { AiOutlineClose } from "react-icons/ai";

const SubtaskPopup = ({ addSubtask, onClose, taskId })=> {
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [subtaskDescription, setSubtaskDescription] = useState("");
  const [subtaskPriority, setSubtaskPriority] = useState("low");

  const generateUniqueId = () => {
    return new Date().getTime();
  };

  const handleAddSubtask = () => {
    const existingSubTasks = JSON.parse(localStorage.getItem("subTask")) || [];
    console.log(existingSubTasks);
    const newSubTask = {
      id: generateUniqueId(),
      taskId:taskId,
      title: subtaskTitle,
      description: subtaskDescription,
      priority: subtaskPriority,
      status : false
    };
    const updatedSubTasks = [...existingSubTasks , newSubTask];
    localStorage.setItem("subTask", JSON.stringify(updatedSubTasks));
    setSubtaskTitle("");
    setSubtaskDescription("");
    setSubtaskPriority("low");
    onClose();
  };
  

  const handleClosePopup = () => {
    onClose(); 
  };

  return (
    <div>
      <div className="overlay" onClick={handleClosePopup}></div>
      <div className="subtask-popup">
        <AiOutlineClose className="close-icon" onClick={handleClosePopup} />
        <h2>Sub Task</h2>
        <label>Title:</label>
        <input
          type="text"
          value={subtaskTitle}
          onChange={(e) => setSubtaskTitle(e.target.value)}
        />
        <label>Description:</label>
        <input
          type="text"
          value={subtaskDescription}
          onChange={(e) => setSubtaskDescription(e.target.value)}
        />
        <label>Priority:</label>
        <select
          value={subtaskPriority}
          onChange={(e) => setSubtaskPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={handleAddSubtask}>Add Subtask</button>
      </div>
    </div>
  );
};

export default SubtaskPopup;
