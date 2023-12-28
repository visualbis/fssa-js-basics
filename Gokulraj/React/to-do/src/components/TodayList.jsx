import "../Assets/TodoForm.css"

function Today({ tasks ,togglePopup}) {
    const date = Date.now();

    const letters = ["#df9dae", "#dfc981", "#79c9de", "#81b6e3"];

    return (
        <div className='today-list'>
            <div>            <h5 style={{
                fontSize: 18,
                color: "grey",
                fontWeight: 700,
                marginBottom: 20,
            }}>Today</h5>

                <div style={{ overflow: "hidden" }}>

                    {tasks.map((object, index) => (
                        <div className="one-task" style={{ backgroundColor: letters[index % letters.length] }}>
                            <h3>{object.taskName}</h3>
                            <h3>Status : {object.status ? "finished" : "Not Completed"}</h3>
                            <button onClick={() => togglePopup(object.id)}>+</button>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    )

}

export default Today;