import { useState } from 'react';
import './Hooks.css';

function Count(){
    const [count, setCount] = useState(0);
    return(
      <div>
        <h2>UseState My Example</h2>
        <h3>Click the button to increase the count {count}</h3>
        <button className="hooksButton" onClick = {() => setCount(count + 1)}>Click me !</button>
      </div>
    )
}



export function UserProfile() {
    const [user, setUser] = useState({ name: '---', age: 0 });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setUser({ ...user, [name]: value });
    };
  
    return (
      <div className="hooksDiv">
        <h2>UseState Example</h2>
        <input className="hooksInput" type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange}/>
        <input className="hooksInput" type="number" name="age" placeholder="Age" value={user.age} onChange={handleChange} />
        <h2>{user.name} is {user.age} years old</h2>
      </div>
    );
}

export default Count;