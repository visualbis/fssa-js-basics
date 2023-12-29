import "../Assets/TodoForm.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faTrash, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'


const SubTask = ({ onClose, subTask, onDelete, taskId }) => {
    return (
        <>
            <div className="overlay" style={{ width: "100%", height: "100%" }}></div>
            <div className='popup' style={{ width: 500 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 10 }}> <h2>Sub Task:- </h2>
                    <button onClick={() => onClose(0)} className="close"><FontAwesomeIcon icon={faXmark} /></button></div>
                {subTask.map((object) => (
                    <div key={object.id} className="one-task">
                        <h3>{object.title}</h3>

                        {/* <button key={object.id}>Edit</button>
                        <button key={object.id} onClick={() => { onDelete(object.id, taskId) }}>Delete</button> */}

                        <div className='values' >
                            {object.status ? <button className='buttons'><FontAwesomeIcon icon={faCircleCheck} style={{ fontSize: 19 }} /></button> :
                                <button className='buttons'><FontAwesomeIcon icon={faCircle} style={{ fontSize: 19 }} /></button>}

                            {/* <button className='buttons' style={{ fontSize: 23 }} onClick={() => (updateTask(object.id))}> <FontAwesomeIcon icon={faPenToSquare} /></button> */}
                            <button className='buttons' style={{ fontSize: 18 }} onClick={() => onDelete(object.id,taskId)}> <FontAwesomeIcon icon={faTrash} /></button>

                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SubTask;
