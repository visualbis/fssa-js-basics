import "../Assets/TodoForm.css"

function Today() {

    return (
        <div className='today-list'>
            <div>            <h5 style={{
                fontSize: 18,
                color: "grey",
                fontWeight:700,
                marginBottom:20,
                }}>Today</h5>
                <div style={{overflow:"hidden"}}>
                    <div className="one-task">
                        <h3>Learn  React</h3>
                    </div>
                    <div className="one-task">
                        <h3>Learn  React</h3>
                    </div>
                    <div className="one-task">
                        <h3>Learn  React</h3>
                    </div>
                    <div className="one-task">
                        <h3>Learn  React</h3>
                    </div>
                    <div className="one-task">
                        <h3>Learn  React</h3>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default Today;