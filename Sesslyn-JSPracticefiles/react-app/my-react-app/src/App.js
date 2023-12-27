import React, { useState } from "react";
import "./App.css";
import UseState, { UserProfile } from "./Hooks/UseState";
import UseEffect, { JsonData }from "./Hooks/UseEffect";
import { Component1, Component5 } from './Hooks/UseContext'; 

function App() {
  const [selectedHooks, setSelectedHooks] = useState("useState");
  const handleHooksChange = (project) => {
    setSelectedHooks(project);
  };

  return (
    <div className="main-section">
      <div>
        
        <div className="hooksFlex">
          <div className="hooksBtn">
              <button onClick={() => handleHooksChange("useState")}>Use State</button>
              <button onClick={() => handleHooksChange("useEffect")}>Use Effect</button>
              <button onClick={() => handleHooksChange("useContext")}>Use Context</button>
              <button onClick={() => handleHooksChange("useRef")}>Use Ref</button>
              <button onClick={() => handleHooksChange("useReducer")}> Use Reducer</button>
              <button onClick={() => handleHooksChange("useCallback")}>Use Callback</button>
              <button onClick={() => handleHooksChange("useMemo")}> Use Memo </button>
          </div>
   
          <div className="hooksDisplay">
            {selectedHooks === "useState" && (
              <>
                <UseState />
                <UserProfile />
              </>
            )}

            {selectedHooks === "useEffect" && (
              <>
                <UseEffect />
                <JsonData />
              </>
            )}

            {selectedHooks === "useContext" && (
              <div>
                <Component1 />
                <Component5 />
              </div>
            )}

           {selectedHooks === "useRef" && (
              <>
                <UseState />
                <UserProfile />
              </>
            )}

           {selectedHooks === "useReducer" && (
              <>
                <UseState />
                <UserProfile />
              </>
            )}

            {selectedHooks === "useCallback" && (
              <>
                <UseState />
                <UserProfile />
              </>
            )}

            {selectedHooks === "useMemo" && (
              <>
                <UseState />
                <UserProfile />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
