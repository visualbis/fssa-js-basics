

    function TodoSample({ addTask, handleInputChange, handleSubTaskChange, newTask ,addSubTask , }) {
        return (
            <div className="all">
                <div className='head'>
                    <h3 className="title">Add a New Task!</h3>
                    <form onSubmit={addTask}>
                        <div className='form-group'>
                            <input type="text" name='taskName' value={newTask.taskName} onChange={handleInputChange} placeholder='Enter a New Task' id="task-Name" />
                        </div>

                        <div className='form-group'>
                            <textarea id="description" name='description' value={newTask.description} onChange={handleInputChange} placeholder='Description' rows="4"></textarea>
                        </div>

                        <div className='form-group'>
                            <label htmlFor="mySelect" >Priority  </label>
                            <select id='mySelect' name="priority" onChange={handleInputChange} value={newTask.priority}>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>

                        <div className='form-group'>
                            <label htmlFor="date" >Due date  </label>
                            <input type="date" id='date' name="dueDate" onChange={handleInputChange} value={newTask.dueDate} />
                        </div>

                        <label htmlFor="subtask">Sub Task</label>
                        {newTask.subTasks.map((subTask, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    name="title"
                                    value={subTask.title}
                                    onChange={(e) => handleSubTaskChange(e, index)}
                                />
                                <label>
                                    Status:
                                    <input
                                        type="checkbox"
                                        name="status"
                                        checked={subTask.status}
                                        onChange={(e) => handleSubTaskChange(e, index)}
                                    />
                                </label>
                            </div>
                        ))}
                        <button type="button" onClick={addSubTask}>+</button>
                        <br />
                        <button type='submit' id='add-task' className='btn'>Add Task</button>
                    </form>
                </div>
            </div>
        );
    }

    export default TodoSample;
