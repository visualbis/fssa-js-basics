import { useState } from "react";
import "../Assets/TodoForm.css"

function TodoList() {


    const [selectedOption, handleSelectOption] = useState("all");


    return (
        <div className='todo-list'>
            <div className="user-info">
                <h4>Name</h4>
            </div>
            <div className="list">
                <div id="nav">
                    <p onClick={() => handleSelectOption('all')}>All</p>
                    <p onClick={() => handleSelectOption('finished')}>Finished</p>
                    <p onClick={() => handleSelectOption('unfinished')} > Unfinished</p>
                </div>
                <div className="task-list">
                    <div className="tasks">
                        <div style={{ width: "300px", height: "40px", overflow: "hidden" }}><p>Learn React </p></div>
                        <p>Jan 3</p>
                    </div>
                    <div className="tasks">

                    </div>
                    <div className="tasks">

                    </div>
                    <div className="tasks">

                    </div>
                    <div className="tasks">

                    </div>
                    {selectedOption === 'finished' && <div>Content for Finished</div>}
                </div>
            </div>
        </div>
    )

}

export default TodoList;