
const SubTask = ({ onClose, subTask, onDelete , taskId}) => {
    return (
        <>
            <div className="overlay" style={{ width: "100%", height: "100%" }}></div>
            <div className='subtaskList' style={{ position: 'fixed', width: 350, height: 500, zIndex: 5, border: "1px solid black", top: 10, left: 400 }}>
                <button onClick={() => onClose(0)}>X</button>
                {subTask.map((object) => (
                    <div key={object.id}>
                        <h1>{object.title}</h1>
                        <p>{object.status ? "completed" : "Not Completed"}</p>
                        <button key={object.id}>Edit</button>
                        <button key={object.id} onClick={() => { onDelete(object.id,taskId) }}>Delete</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SubTask;
