import "./styles.css"

export const renderTodos = (todoElements, todoManager) => {
    const todos = document.getElementById("todo-list-content");
    todos.innerHTML = ''; 

    const todoListContainer = document.createElement("div");
    todoListContainer.classList.add("todo-list-container");
    

    todoElements.forEach((todo, index)=>{
        const projectOptions = todo.project.map(proj => `<option>${proj.title}</option>`).join('');
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.innerHTML = `
            <div>Title: ${todo.title}</div> 
            <div>Description: ${todo.description}</div>
            <div>Due Date: ${todo.dueDate}</div>
            <div>Priority: ${todo.priority}</div>
            <div>Completed: ${todo.completed}</div>
            <div class="selectors">
                <div class="project-select">
                    <label for="projects">Project:</label>
                    <select>
                        ${projectOptions}
                    </select>
                </div>
                <button class="toggle-complete-status" style="margin-top: 10px" data-index="${index}">Complete</button>
                <button class="delete-item" style="margin-top: 10px" data-index="${index}">Delete</button>
            </div>`;

        todoListContainer.appendChild(todoItem);
    })

    todos.appendChild(todoListContainer);

    attachEventListenersTodos(todoManager);
}

export const renderProjects = (projectElements, projectManager, todoManager) => {
    const projects = document.getElementById("project-list-content");
    projects.innerHTML = ''; 

    const projectsListContainer = document.createElement("div");
    projectsListContainer.classList.add("project-list-container");

    projectElements.forEach((project, index)=>{
        const projectItem = document.createElement("div");
        projectItem.classList.add("project-item");
        projectItem.innerHTML = `
            <div>Title: ${project.title}</div> 
            <button class="delete-project" style="margin-top: 10px" data-index=${index}>Delete</button>`;

        projectsListContainer.appendChild(projectItem);
    })

    projects.appendChild(projectsListContainer);

    attachEventListenersProjects(projectManager, todoManager);
}

function attachEventListenersTodos(todoManager){
    const completeButtons = document.querySelectorAll(".toggle-complete-status");
    const deleteButtons = document.querySelectorAll(".delete-item");
    const addTodoButton = document.getElementById("add-task");

    addTodoButton.addEventListener("click", () => {
        const formContainer = document.getElementById("form-container");
        formContainer.style.display = "block";
    });

    completeButtons.forEach(button => {
        button.addEventListener("click", (event) =>  completeTodoItem(event, todoManager));
    })

    deleteButtons.forEach(button => {
        button.addEventListener("click", (event) =>  deleteTodo(event, todoManager));
    })
}

function attachEventListenersProjects(projectManager, todoManager){
    const addProjectButton = document.getElementById("add-project");
    const deleteButtons = document.querySelectorAll(".delete-project");

    addProjectButton.addEventListener("click", () => {
        const formContainerProjects = document.getElementById("form-container-projects");
        formContainerProjects.style.display = "block";
    });

    deleteButtons.forEach(button => {
        button.addEventListener("click", (event) => deleteProject(event, projectManager, todoManager));
    })
}

export const completeTodoItem = (event, todoManager) => {
    const index = event.target.getAttribute('data-index');
    const todo = todoManager.getTodos()[index];
    todo.completed = todo.completed === "yes" ? "no" : "yes";
    renderTodos(todoManager.getTodos(), todoManager);
}

export const addTodo = (todoManager, projectManager) => {
    const formContainer = document.getElementById("form-container");
    const todoForm = document.getElementById("todo-form");

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const dueDate = document.getElementById("dueDate").value;
        const priority = document.getElementById("priority").value;
        const completed = "no";
        const project = projectManager.getProjects();

        todoManager.addTodos(title, description, dueDate, priority, completed, project, projectManager);

        renderTodos(todoManager.getTodos(), todoManager);

        todoForm.reset();

        formContainer.style.display = 'none';
    })
}

export const addProject = (projectManager, todoManager) => {
    const projectFormContainer = document.getElementById("form-container-projects");
    const projectForm = document.getElementById("project-form")

    projectForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const projectTitle = document.getElementById("project-title").value;
        projectManager.addProjects(projectTitle, todoManager);
        renderProjects(projectManager.getProjects(), projectManager, todoManager);
        renderTodos(todoManager.getTodos(), todoManager); 
        projectForm.reset();
        projectFormContainer.style.display = 'none';
    })
}

export const deleteTodo = (event, todoManager, projectManager) => {
    const index = event.target.getAttribute('data-index');
    todoManager.removeTodo(index, projectManager);
    renderTodos(todoManager.getTodos(), todoManager); 
}

export const deleteProject = (event, projectManager, todoManager) => {
    const index = event.target.getAttribute('data-index');
    projectManager.removeProjects(index, todoManager);
    renderProjects(projectManager.getProjects(), projectManager, todoManager); 
    renderTodos(todoManager.getTodos(), todoManager); 
}
