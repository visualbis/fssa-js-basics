import "../Assets/TodoForm.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faPenToSquare, faTrash, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'

function Today({ togglePopupTask, tasks, updateTask, deleteTask, updateStatus }) {

    const letters = ["#df9dae", "#dfc981", "#79c9de"];

    return (
        <div className='today-list'>
            <div>

                <div style={{ overflow: "hidden" }}>

                    {tasks.map((object, index) => (
                        <div key={object.id} className="one-task" style={{ backgroundColor: letters[index % letters.length] }}>
                            <div className='hidden' key={object.id}  >
                                <h3>{object.taskName}</h3>
                            </div>
                            <div className='values' key={`buttons-${object.id}`}>
                            {
                                object.status ? <button className='buttons'><FontAwesomeIcon icon={faCircleCheck} style={{ fontSize: 19 }} /></button> :
                                    <button className='buttons'><FontAwesomeIcon icon={faCircle} onClick={() => { updateStatus(object.id) }} style={{ fontSize: 19 }} /></button>
                            }


                                < button className='buttons' id='down-icon' style={{ fontSize: 30 }} onClick={() => togglePopupTask(object.id)}> <FontAwesomeIcon icon={faCaretDown} /></button>
                            <button className='buttons' style={{ fontSize: 23 }} onClick={() => (updateTask(object.id))}> <FontAwesomeIcon icon={faPenToSquare} /></button>
                            <button className='buttons' style={{ fontSize: 18 }} onClick={() => deleteTask(object.id)}> <FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                        </div>
                    ))}

            </div>
        </div>

        </div >
    )

}

export default Today;