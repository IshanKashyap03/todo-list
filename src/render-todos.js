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
            <button class="toggle-complete-status">Complete</button>
            <button class="delete-item">Delete</button>`;

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
    renderTODOs(todoManager.getTodos(), todoManager); // Re-render the list to reflect changes
}

export const addTodo = (todoManager) => {
    const addTodoButton = document.getElementById("add-task");
    addTodoButton.addEventListener('click', () => {
        todoManager.addTodos('Finish project', 'Complete the pending project', '2024-08-20', 'high', 'no');
        renderTODOs(todoManager.getTodos(), todoManager);
    });
}

export const deleteTodo = (event, todoManager) => {
    const index = event.target.parentElement.getAttribute('data-index');
    todoManager.removeTodo(index);
    renderTODOs(todoManager.getTodos(), todoManager); 
}
