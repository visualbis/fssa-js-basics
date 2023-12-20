import "./todo.css"

const Timer =(props)=>{
       
    const increase =() =>{
        let newValue =props.timer.timevalue+1
        props.timer.timeEvent(newValue);
    }
    const decrease =() =>{
        let newValue =props.timer.timevalue-1 
        props.timer.timeEvent(newValue);
    }
    

    return(
        <div className="timer input-task" >
             <span class="material-symbols-outlined">
schedule
</span>
           
            <input type="number"  className="time" value={props.timer.timevalue}  />
           
        
            <span  onClick={increase} class="material-symbols-outlined timer-icons">
add
</span>

<span onClick={decrease} class="material-symbols-outlined timer-icons">
remove
</span>
        </div>
    )
    



}
export default Timer;