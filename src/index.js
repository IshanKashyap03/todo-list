import TodoManager from "./todo-manager";
import ProjectManager from "./project-manager";
import { renderTodos, renderProjects, addProject, addTodo } from "./render-todos-and-projects";

const todoManager = new TodoManager();
const projectManager = new ProjectManager();

renderTodos(todoManager.getTodos(), todoManager);
renderProjects(projectManager.getProjects(), projectManager, todoManager);
addTodo(todoManager, projectManager);
addProject(projectManager, todoManager);