import Timer from "../timer";

const CreateTask = (props) => {

    let data = {}
    const handleSubmit = (e) =>{
        e.preventDefault();
        const date = new Date();
        data.id = Date.now();
        data.title = props.properties.newTodo;
        data.createdAt = date.getDate + "-" +date.getMonth +"-" + date.getFullYear;
        data.createdOn = date.getHours + " : " + date.getMinutes;  
        data.time =props.properties.timevalue;
        props.properties.updateTodo([...props.properties.todos,data])}
    
    const createTodo = (e)=>{
        props.properties.createTodo(e.target.value)
    }

    return(
        <form className="create-task-form" onSubmit={(e)=>{handleSubmit(e   )}}>
            <h3>Create Task</h3>
                <input className="input-task" type="text" placeholder="Enter the Task"  onChange={(e)=>{createTodo(e)}}/>
                <Timer timer={props.properties}/>
                <button type="submit" >Create</button>

        </form>
    )

     
    }


export default CreateTask;


