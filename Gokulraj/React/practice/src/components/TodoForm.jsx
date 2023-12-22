import "../Assets/TodoForm.css"

function TodoForm() {

    return (
        <>
        <div className="todo-form" >
            <form>
                <input type="text" id='search' placeholder="Search a Task..."/>
                <button type='submit' id="add-btn">+</button>
            </form>
        </div>
        </>
    )
}

export default TodoForm;