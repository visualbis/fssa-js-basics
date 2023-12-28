import React, { useState, useEffect } from "react";
import TodoSample from "./TodoSample";
import SubTask from "./SubTask";

function Todo() {
    const storedData = JSON.parse(localStorage.getItem("tasks")) || [];

    const [newTask, setNewTask] = useState({
        taskName: '',
        description: '',
        priority: 'high',
        dueDate: '',
        status: false,
        subTasks: [],
    });
    const [tasks, setTasks] = useState(storedData);
    const [isPopupActive, setPopupActive] = useState(false);
    const [subTaskId, setSubTaskId] = useState(0);
    const [subTask, setSubTask] = useState([]);
    const [editTask, setEditTask] = useState(null);

    const deleteSubTask = (subTaskId, taskId) => {
        let updatedSubTasks;
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                updatedSubTasks = task.subTasks.filter((subTask) => subTask.id !== subTaskId);
                return { ...task, subTasks: updatedSubTasks };
            }
            return task;
        });
        setTasks(updatedTasks);
        setSubTask(updatedSubTasks);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        console.log("completed")
    }, [tasks]);

    const setSubTasks = (id) => {
        const task = tasks.find((task) => task.id === id);
        setSubTask(task ? task.subTasks : []);
    };

    const togglePopup = (newId) => {
        setSubTaskId(newId);
        setSubTasks(newId);
        setPopupActive(!isPopupActive);
    };

    const handleSubTaskChange = (e, index) => {
        const { name, value } = e.target;
        const updatedSubTasks = [...newTask.subTasks];
        updatedSubTasks[index][name] = value;
        setNewTask((prevData) => ({
            ...prevData,
            subTasks: updatedSubTasks,
        }));
    };

    const addSubTask = () => {
        const updatedSubTasks = [...newTask.subTasks, { id: Date.now(), title: '', status: false }];
        setNewTask((prevData) => ({ ...prevData, subTasks: updatedSubTasks }));
    };

    const addTask = (e) => {
        e.preventDefault();

        if (editTask) {
            const updatedTasks = tasks.map((task) => (task.id === editTask.id ? newTask : task));
            setTasks(updatedTasks);
            setEditTask(null);
            setNewTask({
                taskName: '',
                description: '',
                priority: 'high',
                dueDate: '',
                status: false,
                subTasks: [],
            })

        } else {


            const newTasks = {
                id: Date.now(),
                taskName: newTask.taskName,
                description: newTask.description,
                priority: newTask.priority,
                dueDate: newTask.dueDate,
                status: false,
                subTasks: newTask.subTasks,
            };
            setTasks((prevTasks) => [newTasks, ...prevTasks]);
            setNewTask({
                taskName: '',
                description: '',
                priority: 'high',
                dueDate: '',
                status: false,
                subTasks: [],
            });
        }
    };

    const deleteTask = (id) => {
        const del = tasks.filter((oneTask) => oneTask.id !== id);
        setTasks([...del]);
        return;
    }


    const updateTask = (id) => {
        // Find the task with the given ID and set it in the newTask state for editing
        const taskToEdit = tasks.find((task) => task.id === id);

        if (taskToEdit) {
            setNewTask({
                taskName: taskToEdit.taskName,
                description: taskToEdit.description,
                priority: taskToEdit.priority,
                dueDate: taskToEdit.dueDate,
                status: taskToEdit.status,
                subTasks: taskToEdit.subTasks,
            });
            setEditTask(taskToEdit);
        }
    }


    return (
        <>
            <TodoSample
                addTask={addTask}
                handleInputChange={handleInputChange}
                handleSubTaskChange={handleSubTaskChange}
                newTask={newTask}
                addSubTask={addSubTask}
            />

            <div className='todo-list'>
                <ul>
                    {tasks.map((t) => (
                        <li style={{ listStyle: "none" }} className='single-todo' key={t.id}>
                            <button onClick={() => togglePopup(t.id)}>+</button>
                            <span>{t.taskName}</span>
                            <button onClick={() => (updateTask(t.id))} key={t.id} >Edit</button>
                            <button onClick={() => deleteTask(t.id)} key={t.id}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            {isPopupActive && <SubTask onClose={togglePopup} subTask={subTask} onDelete={deleteSubTask} taskId={subTaskId} />}
        </>
    );
}

export default Todo;
