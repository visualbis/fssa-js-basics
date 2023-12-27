import React, { useState, useEffect } from "react";
import TodoList from "./todo-app";

export default function App() {

  return (
    <div style={{ margin: "5rem" }}>
      
      <div>
        <TodoList />
      </div>
    </div>
  );
}
