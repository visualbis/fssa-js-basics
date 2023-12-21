import React, { useContext, createContext, useState, useEffect } from "react";

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
      <h1>User Login</h1>
      <Page />
    </UserContext.Provider>
  );
};

const Page = () => {
   const user = useContext(UserContext);
   if(user?.email){
     return <p>You are logged in as {user?.email}</p>
   }else{
    return <p>You are not logged in</p>
   }
}

export default Userlogin;
