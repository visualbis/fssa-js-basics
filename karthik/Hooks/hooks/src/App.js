import "./App.css";
import React, { useState, useEffect, createContext, useContext } from "react";

// Step 1: Create a context
const MyContext = createContext();

// Step 2: Create a provider component
const MyProvider = ({ children }) => {
  const [value, setValue] = useState('Hello from Context!');

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

// Step 3: Consume the context using useContext
const MyComponent = () => {
  const contextValue = useContext(MyContext);

  return (
    <div>
      <p>{contextValue}</p>
    </div>
  );
};

// Step 4: Wrap your components with the provider
const ClassApp = () => {
  return (
    <MyProvider>
      <MyComponent />
    </MyProvider>
  );
};

// Main App component
export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <h1>UseEffect</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <ClassApp />
    </div>
  );
}
