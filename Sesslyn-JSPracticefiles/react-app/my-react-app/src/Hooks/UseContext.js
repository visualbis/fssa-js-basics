import React, { useState, createContext, useContext } from 'react';

const UserContext = createContext();

export function Component1() {
  const [user, setUser] = useState("Jesse Hall");

  console.log(user);

  return (
    <UserContext.Provider value={{ user }}>
      <div>
        <h2>{`Hello ${user}!`}</h2>
        <button onClick={() => setUser("Sesslyn Johnson")}>Update User</button>
      </div>
    </UserContext.Provider>
  );
}

export function Component5() {
  const contextValue = useContext(UserContext);
  console.log(contextValue);
  const user = contextValue && contextValue.user ? contextValue.user : "Default User";

  return (
    <>
      <h2 style={{ marginTop: '20px' }}>Component 5</h2>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  );
}
