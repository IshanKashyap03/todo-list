import "./styles.css"

export const renderTODOs = (todoElements, todoManager) => {
    const todos = document.getElementById("todo-list-content");
    todos.innerHTML = ''; 

    const todoListContainer = document.createElement("div");
    todoListContainer.classList.add("todo-list-container");

    todoElements.forEach((todo, index)=>{
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.setAttribute('data-index', index);
        todoItem.innerHTML = `
            <div>Title: ${todo.title}</div> 
            <div>Description: ${todo.description}</div>
            <div>Due Date: ${todo.dueDate}</div>
            <div>Priority: ${todo.priority}</div>
            <div>Completed: ${todo.completed}</div>
            <button class="toggle-complete-status" style="margin-top: 10px">Complete</button>
            <button class="delete-item" style="margin-top: 10px">Delete</button>`;

        todoListContainer.appendChild(todoItem);
    })

    todos.appendChild(todoListContainer);

    attachEventListeners(todoManager);
}

function attachEventListeners(todoManager){
    const completeButtons = document.querySelectorAll(".toggle-complete-status");
    const deleteButtons = document.querySelectorAll(".delete-item");

    completeButtons.forEach(button => {
        button.addEventListener("click", (event) =>  completeTodoItem(event, todoManager));
    })

    deleteButtons.forEach(button => {
        button.addEventListener("click", (event) =>  deleteTodo(event, todoManager));
    })
}

export const completeTodoItem = (event, todoManager) => {
    const index = event.target.parentElement.getAttribute('data-index');
    const todo = todoManager.getTodos()[index];
    todo.completed = todo.completed === "yes" ? "no" : "yes";
    renderTODOs(todoManager.getTodos(), todoManager);
}

export const addTodo = (todoManager) => {
    const addTodoButton = document.getElementById("add-task");
    const formContainer = document.getElementById("form-container");
    const todoForm = document.getElementById("todo-form");
    addTodoButton.addEventListener('click', () => {
        formContainer.style.display = "block";
    });

    formContainer.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const dueDate = document.getElementById("dueDate").value;
        const priority = document.getElementById("priority").value;

        todoManager.addTodos(title, description, dueDate, priority, "no");

        renderTODOs(todoManager.getTodos(), todoManager);

        todoForm.reset();

        formContainer.style.display = 'none';
    })


}

export const deleteTodo = (event, todoManager) => {
    const index = event.target.parentElement.getAttribute('data-index');
    todoManager.removeTodo(index);
    renderTODOs(todoManager.getTodos(), todoManager); 
}
