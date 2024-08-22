export const loadDataFromLocalStorage = () => {
    const todosJSON = localStorage.getItem('todos');
    const projectsJSON = localStorage.getItem('projects');

    const todos = todosJSON ? JSON.parse(todosJSON) : [];
    const projects = projectsJSON ? JSON.parse(projectsJSON) : [];

    return { todos, projects };
};

export const saveDataToLocalStorage = (todoManager, projectManager) => {
    const todosJSON = JSON.stringify(todoManager.getTodos());
    const projectsJSON = JSON.stringify(projectManager.getProjects());

    localStorage.setItem('todos', todosJSON);
    localStorage.setItem('projects', projectsJSON);
};
