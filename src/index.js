import TodoManager from "./todo-manager";
import ProjectManager from "./project-manager";
import { renderTodos, renderProjects, addProject, addTodo } from "./render-todos-and-projects";
import { loadDataFromLocalStorage } from "./localstorageFuctions";

const { todos, projects } = loadDataFromLocalStorage();

const todoManager = new TodoManager(todos);
const projectManager = new ProjectManager(projects);

renderTodos(todoManager.getTodos(), todoManager);
renderProjects(projectManager.getProjects(), projectManager, todoManager);
addTodo(todoManager, projectManager);
addProject(projectManager, todoManager);