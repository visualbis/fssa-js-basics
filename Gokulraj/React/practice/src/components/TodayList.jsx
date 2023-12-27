import "../Assets/TodoForm.css"

function Today({ tasks }) {

    const date = Date.now();


    return (
        <div className='today-list'>
            <div>            <h5 style={{
                fontSize: 18,
                color: "grey",
                fontWeight: 700,
                marginBottom: 20,
            }}>Today</h5>

                <div style={{ overflow: "hidden" }}>

                    {tasks.map((object) => (
                        <div className="one-task">
                            <h3>{object.taskName}</h3>
                            
                        </div>
                    ))}

                </div>
            </div>

        </div>
    )

}

export default Today;