import "./view.css"
const ViewTask  = (props)=>{

    let count = 0;
    const array = props.array.map((e)=>{
        count++;
        console.log(e)

        return (<div className="task">
            <p>{count}</p>
            <p>{e.title}</p>
            <div>
            <span class="material-symbols-outlined">
schedule
</span> {e.time} mins
          

            </div>
            <button>Start <span class="material-symbols-outlined">
not_started
</span></button>
           
        </div>);
    })

    return (
        <div className="task-list-div">
            <h1>Your  Tasks </h1>
            <div className="task-list"> {array}</div>



        </div>
    )
}
export default ViewTask;
