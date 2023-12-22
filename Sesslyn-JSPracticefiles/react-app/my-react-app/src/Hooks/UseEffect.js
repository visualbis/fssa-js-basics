import { useState, useEffect } from 'react';
import './Hooks.css';

function Multiple() {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(2);

  useEffect(() => {
    setNumber(count * 2);
  }, [count]);

  return (
    <div>
      <h2>UseEffect</h2>
      <h3>Example: 1</h3>
      <h3>Click the button to increase the count {count}</h3>
      <p className="hooksPara">I have been multiplied by 2: {number}</p>
      <button style={{ marginLeft: '130px' }} className="hooksButton" onClick={() => setCount(count + 1)}>Click me!</button>
    </div>
  );
}
export default Multiple;
//Unmount real world example
//willmount

export function JsonData() {


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h3>Example : 2</h3>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      )}
    </div>
  );
}
