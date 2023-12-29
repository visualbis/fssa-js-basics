import "../Assets/TodoForm.css"

function TodoForm({togglePopup}) {

    return (
        <>
        <div className="todo-form" >
         
                <input type="text" id='search' placeholder="Search a Task..."/>
                <button type='submit' onClick={togglePopup} id="add-btn">+</button>
        </div>
        </>
    )
}

export default TodoForm;