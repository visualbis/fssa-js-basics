import { React, useState } from 'react';

const Popup = ({ onClose, onAddTask }) => {

    const [formData, setFormData] = useState({
        taskName: '',
        description: '',
        priority: 'high',
        dueDate: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddTask = (e) => {
        e.preventDefault();

        const newTask = {
            id: Date.now(),
            taskName: formData.taskName,
            description: formData.description,
            priority: formData.priority,
            dueDate: formData.dueDate,
        };

        onAddTask(newTask);

        onClose();
    };


    return (
        <>
            <div className="overlay"></div>
            <div className="popup">
                <div className="popup-content">
                    <h2>Task :-</h2>
                    <button onClick={onClose}>X</button>
                </div>
                <div className='form'>
                    <form onSubmit={handleAddTask}>

                        <div className='form-group'>
                            <input type="text" name='taskName' value={formData.taskName} onChange={handleInputChange} placeholder='Enter a New Task' id="task-Name" />
                        </div>

                        <div className='form-group'>
                            <textarea id="description" name='description' value={formData.description} onChange={handleInputChange} placeholder='Description' rows="4"></textarea>
                        </div>

                        <div className='form-group'>
                            <label htmlFor="mySelect" >Priority  </label>
                            <select id='mySelect' name="priority" onChange={handleInputChange} value={formData.priority}>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>

                        <div className='form-group'>
                            <label htmlFor="date" >Due date  </label>
                            <input type="date" id='date' name="dueDate" onChange={handleInputChange} value={formData.dueDate} />
                        </div>

                        <button onClick={onClose} id='cancel' className='btn'>Cancel</button>
                        <button type='submit' id='add-task' className='btn'> Add Task</button>
                    </form>
                </div>
            </div>
        </>

    );
};


export default Popup;