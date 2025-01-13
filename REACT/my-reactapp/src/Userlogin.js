import React, { useContext, createContext, useState, useEffect } from "react";
import './hooks.css';

//create context
const UserContext = createContext();

const Userlogin = () => {
  //State managment
  const [user, setUser] = useState(null);

  //fetch a user from a fake backend API
  //https://dummyjson.com/users

  useEffect(() => {
    const fetchUser = () => {
      fetch(`https://dummyjson.com/users`)
        .then((response) => response.json())
        .then((result) => setUser(result.users[0]))
        .catch((error) => console.error("Serve side error accourred"));
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <h2>User Login</h2>
      <Page />
    </UserContext.Provider>
     
  );
};

const Page = () => {
  const user = useContext(UserContext);

  return (
    <div className="Page">
      {user?.email ? (
        <p className="logged-in">You are logged in as {user?.email}</p>
      ) : (
        <p className="not-logged-in">You are not logged in</p>
      )}
    </div>
  );
}

export default Userlogin;
