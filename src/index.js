import TodoManager from "./todo-manager";
import { deleteTodo, renderTODOs, addTodo, completeTodoItem } from "./render-todos";

const todoManager = new TodoManager();

renderTODOs(todoManager.getTodos(), todoManager);
addTodo(todoManager);