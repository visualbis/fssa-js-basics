import React, { useState, useMemo } from 'react'

const UseMemo = () => {

    const [count, setCount] = useState(10)
    const [arr, setArr] = useState([1,2,3,4,5])

    function showMax() {
        console.log('Changing max');
        return Math.max(...arr);
    }
    
    //Use Mamo Hook
    const memVal = useMemo(() => showMax(), [arr]);

  return (
    <>
     <button onClick={() => setCount(count + 1)}>Add count</button>
     <button onClick={() => setArr([...arr, Math.round(count * Math.random())])}>Add to Array</button>
     <p>{JSON.stringify(arr)}</p>
     <p>{memVal}</p>
     <p>{count}</p>
    </>
  )
}

export default UseMemo