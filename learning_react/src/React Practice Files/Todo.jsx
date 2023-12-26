// import React, { useState } from 'react';
// import "../React Practice CSS files/Todo.css"

// const TodoApp = () => {
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState('');
//   const [newPriority, setNewPriority] = useState('medium');
//   const [editTodoId, setEditTodoId] = useState(null);
//   const [editedText, setEditedText] = useState('');

//   const addTodo = () => {
//     if (newTodo.trim() !== '') {
//       setTodos([
//         ...todos,
//         { id: Date.now(), text: newTodo, priority: newPriority, completed: false },
//       ]);
//       setNewTodo('');
//       setNewPriority('medium');
//     }
//   };

//   const toggleTodo = (id) => {
//     setTodos((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   };

//   const removeTodo = (id) => {
//     setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
//   };

//   const startEdit = (id, text) => {
//     setEditTodoId(id);
//     setEditedText(text);
//   };

//   const cancelEdit = () => {
//     setEditTodoId(null);
//     setEditedText('');
//   };

//   const saveEdit = (id) => {
//     setTodos((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo.id === id ? { ...todo, text: editedText } : todo
//       )
//     );
//     setEditTodoId(null);
//     setEditedText('');
//   };

//   return (
//     <div>
//       <h1>Todo App</h1>

//       <div>
//         <input
//           type="text"
//           value={newTodo}
//           onChange={(e) => setNewTodo(e.target.value)}
//           placeholder="New Todo"
//         />
//         <select
//           value={newPriority}
//           onChange={(e) => setNewPriority(e.target.value)}
//         >
//           <option value="low">Low</option>
//           <option value="medium">Medium</option>
//           <option value="high">High</option>
//         </select>
//         <button onClick={addTodo}>Add Todo</button>
//       </div>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>
//             <input
//               type="checkbox"
//               checked={todo.completed}
//               onChange={() => toggleTodo(todo.id)}
//             />
//             {editTodoId === todo.id ? (
//               <input
//                 type="text"
//                 value={editedText}
//                 onChange={(e) => setEditedText(e.target.value)}
//               />
//             ) : (
//               <span
//                 style={{
//                   textDecoration: todo.completed ? 'line-through' : 'none',
//                 }}
//               >
//                 {todo.text} (Priority: {todo.priority})
//               </span>
//             )}
//             {todo.completed ? (
//               <span>Completed</span>
//             ) : (
//               <>
//                 <button onClick={() => removeTodo(todo.id)}>Remove</button>
//                 {editTodoId === todo.id ? (
//                   <>
//                     <button onClick={() => saveEdit(todo.id)}>Save</button>
//                     <button onClick={cancelEdit}>Cancel</button>
//                   </>
//                 ) : (
//                   <button onClick={() => startEdit(todo.id, todo.text)}>Edit</button>
//                 )}
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
      
//     </div>
//   );
// };

// export default TodoApp;

import React, { useState, useEffect } from 'react';
import "../React Practice CSS files/Todo.css"

const TodoApp = () => {
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (mainTask) => {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        if (!updatedTasks[mainTask]) {
          updatedTasks[mainTask] = [];
        }
        updatedTasks[mainTask].push({
          id: Date.now(),
          text: newTask,
          priority: newPriority,
          completed: false,
        });
        return updatedTasks;
      });
      setNewTask('');
      setNewPriority('medium');
    }
  };

  const toggleTask = (mainTask, id) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[mainTask] = updatedTasks[mainTask].map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      return updatedTasks;
    });
  };

  const removeTask = (mainTask, id) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[mainTask] = updatedTasks[mainTask].filter(
        (task) => task.id !== id
      );
      return updatedTasks;
    });
  };

  const startEdit = (mainTask, id, text) => {
    setEditTaskId(id);
    setEditedText(text);
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setEditedText('');
  };

  const saveEdit = (mainTask, id) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[mainTask] = updatedTasks[mainTask].map((task) =>
        task.id === id ? { ...task, text: editedText } : task
      );
      return updatedTasks;
    });
    setEditTaskId(null);
    setEditedText('');
  };

  return (
    <div className="todo-container">
      <h1>Task Manager</h1>
      {Object.keys(tasks).map((mainTask) => (
        <div key={mainTask} className="task-category">
          <h2>{mainTask}</h2>
          <div>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder={`New ${mainTask} Task`}
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button onClick={() => addTask(mainTask)}>Add Task</button>
          </div>
          <ul>
            {tasks[mainTask].map((task) => (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(mainTask, task.id)}
                />
                {editTaskId === task.id ? (
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                ) : (
                  <span
                    className={task.completed ? 'completed' : ''}
                  >
                    {task.text} (Priority: {task.priority})
                  </span>
                )}
                {task.completed ? (
                  <span>Completed</span>
                ) : (
                  <>
                    <button onClick={() => removeTask(mainTask, task.id)}>
                      Remove
                    </button>
                    {editTaskId === task.id ? (
                      <>
                        <button onClick={() => saveEdit(mainTask, task.id)}>
                          Save
                        </button>
                        <button onClick={cancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <button onClick={() => startEdit(mainTask, task.id, task.text)}>
                        Edit
                      </button>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TodoApp;
