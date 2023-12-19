import React, { useState } from 'react';
import Timer from './timer';
import "./todo.css"
import CreateTask from './create/CreateTask';
import ViewTask from './view/ViewTask';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [time , setTimer] = useState(0);

    const props = {
        timevalue : time,
        timeEvent : setTimer,
        newTodo : newTodo,
        createTodo : setNewTodo,
        todos : todos,
        updateTodo : setTodos
    }

    return (
        <div className='dashboard'>
            <div className="taskManager">
                <div className="create-task">
                <CreateTask properties = {props}/>
                </div>
            </div>
            <ViewTask array ={todos}/>
        </div>
    );
};      







export default TodoApp;