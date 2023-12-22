import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TodoForm from './components/TodoForm';
import reportWebVitals from './reportWebVitals';
import Today from "./components/TodayList";
import TodoList from './components/TodoList';
import Popup from './components/Popup'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="app-container" >
      <div className="left-side">
        <TodoForm />
        <Today />
      </div>
      
      <div className="right-side">
        <TodoList />
      </div>
    </div>
  </React.StrictMode>
);

reportWebVitals();
